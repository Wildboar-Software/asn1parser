/**
 * @summary All non-newline whitespace characters recognized by the ASN.1
 *  specifications.
 * @description
 *
 * Includes all of the whitespace Unicode characters named on the
 * [Wiki for Whitespace Characters](https://en.wikipedia.org/wiki/Whitespace_character),
 * but omitting newline characters.
 *
 * Inclues:
 * - `TAB` / `U+0009`
 * - `SP` / `U+0020`
 * - `NBSP` / `U+00A0`
 * - `U+1680`
 * - `U+2000` - `U+200A` (inclusive)
 * - `U+202F`
 * - `U+205F`
 * - `U+3000`
 *
 * However, ITU X.680, Section 12.1.6, defines non-newline whitespace as:
 * - `TAB` / `U+0009`
 * - `SP` / `U+0020`
 * - `NBSP` / `U+00A0`
 *
 * @constant
 */
export const nonNewlineWhitespaceCharacters: Set<number> = new Set<number>([
  0x0009, 0x0020, 0x00a0,
  // 0x1680,
  // 0x2000,
  // 0x2001,
  // 0x2002,
  // 0x2003,
  // 0x2004,
  // 0x2005,
  // 0x2006,
  // 0x2007,
  // 0x2008,
  // 0x2009,
  // 0x200A,
  // 0x202F,
  // 0x205F,
  // 0x3000,
]);

export default nonNewlineWhitespaceCharacters;
