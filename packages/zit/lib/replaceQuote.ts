export function replaceDoubleQuote(str: string): string {
  return str.toString().replace(/"/g, '\\"');
}
export function replaceNewLine(str: string): string {
  return str.replace(/(?:\r\n|\r|\n)/g, '\\n');
}
