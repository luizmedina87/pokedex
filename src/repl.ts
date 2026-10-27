export function cleanInput(str: string): string[] {
  return str.toLowerCase().match(/\S+/g) ?? [];
}