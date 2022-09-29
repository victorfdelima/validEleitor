export function TextEllipsis(text: string, length: number): string {
  if (!text) return '';

  return text.length > length ? text.slice(0, length) + '...' : text;
}
