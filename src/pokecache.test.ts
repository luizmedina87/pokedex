import { Cache } from "./pokecache.js";
import { test, expect } from "vitest";


// Test add
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});


// Test stopReapLoop
test.concurrent.each([
  {
    key: "http://example.com",
    val: "test",
    interval: 1000,
  },
  {
    key: "http://example.com/short",
    val: "shorter test",
    interval: 1,
  },
])("Test stopping the reap", async({ key, val, interval }) => {
  const cache = new Cache(interval);
  
  cache.stopReapLoop();
  
  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);
});


// Test staggered addition
test("Staggered cache expiration test", async () => {
  const timeout = 1000;
  const cache = new Cache(timeout);

  const [keyExpire1, dataExpire1] = ["url1", "expired1"];
  const [keyExpire2, dataExpire2] = ["url2", "expired2"];
  const [keySurvive1, dataSurvive1] = ["url3", "survived1"];
  const [keySurvive2, dataSurvive2] = ["url4", "survived2"];

  // Add data that will expire
  cache.add(keyExpire1, dataExpire1);
  cache.add(keyExpire2, dataExpire2);

  await new Promise((resolve) => setTimeout(resolve, timeout * 2));

  // Add data that will survive
  cache.add(keySurvive1, dataSurvive1);
  cache.add(keySurvive2, dataSurvive2);

  await new Promise((resolve) => setTimeout(resolve, timeout / 10));

  expect(cache.get(keyExpire1)).toBe(undefined);
  expect(cache.get(keyExpire2)).toBe(undefined);
  expect(cache.get(keySurvive1)).toBe(dataSurvive1);
  expect(cache.get(keySurvive2)).toBe(dataSurvive2);
});