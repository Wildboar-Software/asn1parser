import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * @summary The callback called upon parsing a `Value`
 * @description
 * This resets the `currentType` to prevent parsing future values according to
 * the indicated type of this `Value`.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseValue = function onDidParseValue(ctx: ParseContext): void {
  ctx.currentType = undefined;
};
export default onDidParseValue;
