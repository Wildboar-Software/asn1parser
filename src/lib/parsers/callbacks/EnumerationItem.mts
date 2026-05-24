import type ParseContext from '../../interfaces/ParseContext.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary The callback called upon parsing an `EnumerationItem`
 * @description
 * This callback adds the newly discovered enumeration identifier to the
 * parsing context's list of discovered enumeration items.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseEnumerationItem = function onDidParseEnumerationItem(ctx: ParseContext): void {
  const alt = ctx.cst.children[0];
  if (!alt) {
    return;
  }
  // NamedNumber is handled elsewhere.
  if (alt.type === ProductionType.identifier) {
    ctx.definedEnumItems.add(
      ctx.text.slice(alt.location.startIndex, alt.location.endIndex)
    );
  }
};
export default onDidParseEnumerationItem;
