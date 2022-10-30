export function replaceDoubleQuote(str: string): string {
  return str.replace(/"/g, '\\"');
}
export function replaceNewLine(str: string): string {
  return str.replace(/\n/g, '\\n');
}
