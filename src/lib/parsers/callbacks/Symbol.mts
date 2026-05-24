import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * @summary The callback called upon parsing a `Symbol`
 * @description
 * This adds the discovered symbol to the parsing context's set of
 * recognized symbols so that, when parsing objects later on,
 * fewer mistakes are made as to which tokens are literals and which are
 * identifiers.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseSymbol = function onDidParseSymbol(ctx: ParseContext): void {
  ctx.discoveredIdentifiers.set(
    ctx.text
      .slice(ctx.cst.location.startIndex, ctx.cst.location.endIndex)
      .replace(/\{.*\}/, ''),
    null // The assignment type of imports cannot be determined at parsing time.
  );
};
export default onDidParseSymbol;
