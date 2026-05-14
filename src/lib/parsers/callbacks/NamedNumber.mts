import type ParseContext from '../../interfaces/ParseContext.js';

/**
 * @summary The callback called upon parsing a `NamedNumber`
 * @description
 * This callback adds the identifier from a `NamedNumber` to the set of
 * discovered enumeration items discovered during parsing.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export default function onDidParseNamedNumber(ctx: ParseContext): void {
  const id = ctx.cst.children[0];
  if (!id) {
    return;
  }
  ctx.definedEnumItems.add(
    ctx.text.slice(id.location.startIndex, id.location.endIndex)
  );
}
