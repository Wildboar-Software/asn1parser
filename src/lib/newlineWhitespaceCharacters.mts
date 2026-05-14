/**
 * @summary All newline characters recognized by the ASN.1 specifications.
 * @description
 *
 * From [the Wiki on Newline Characters](https://en.wikipedia.org/wiki/Newline#Unicode),
 * the following ought to be considered newline characters:
 * - `LF`:    Line Feed, `U+000A`
 * - `VT`:    Vertical Tab, `U+000B`
 * - `FF`:    Form Feed, `U+000C`
 * - `CR`:    Carriage Return, `U+000D`
 * - `NEL`:   Next Line, `U+0085`
 * - `LS`:    Line Separator, `U+2028`
 * - `PS`:    Paragraph Separator, `U+2029`
 *
 * However, ITU X.680, Section 12.1.6, defines the newline characters as:
 * - `LF`:    Line Feed, `U+000A`
 * - `VT`:    Vertical Tab, `U+000B`
 * - `FF`:    Form Feed, `U+000C`
 * - `CR`:    Carriage Return, `U+000D`
 *
 * @constant
 */
export const newlineWhitespaceCharacters: Set<number> = new Set<number>([
  0x000a, 0x000b, 0x000c, 0x000d,
  // 0x0085,
  // 0x2028,
  // 0x2029,
]);

export default newlineWhitespaceCharacters;
