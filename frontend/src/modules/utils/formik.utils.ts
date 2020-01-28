export function getLangFromName(name: string): string {
  const match = name.match(/.*\[(.*)\]/);
  const lang = match ? match[1] : '';
  return lang;
}
