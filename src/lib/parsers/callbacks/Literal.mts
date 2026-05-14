import type ParseContext from '../../interfaces/ParseContext.js';

/**
 * @summary The callback called upon parsing an `Literal`
 * @description
 * This callback adds the newly discovered enumeration identifier to the
 * parsing context's list of discovered enumeration items.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export default function onDidParseLiteral(ctx: ParseContext): void {
  const loc = ctx.cst.location;
  const text = ctx.text.slice(loc.startIndex, loc.endIndex);
  ctx.justParsedPluralLiteral = text.charAt(text.length - 1) === 'S';
}
