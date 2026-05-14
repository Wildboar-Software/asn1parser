/**
 * @summary Unescape the escape sequences in a `cstring`
 * @param {string} str The `cstring` to be unescaped
 * @returns {string} The unescaped `cstring`
 * @function
 */
export default function unescapeCstring(str: string): string {
  return str
    .slice(1, -1)
    .replace(/""/gu, '"')
    .replace(/\r?\n\s*/g, '');
}
