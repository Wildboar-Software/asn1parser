import whitespaceIntolerantList from './whitespaceIntolerantList.mjs';
import type Parser from '../../Parser.mjs';
import optional from './optional.mjs';
import whitespace from './whitespace.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary Parse any number of list items optionally separated by whitespace.
 * @description
 * This differs from `whitespaceDelimitedList` in that the whitespace is
 * optional.
 * @param {ProductionType} containingType The type of the `Production` that will
 *  subsume all parsed items of the list as children.
 * @param {Parser} listItemParser The `Parser` that will parse individual items
 *  of the list.
 * @returns {Parser} A `Parser` that will parse one or more list items that may
 *  be separated by whitespace.
 * @function
 */
export const whitespaceOptionalDelimitedList = function (
  containingType: ProductionType,
  listItemParser: Parser
): Parser {
  return whitespaceIntolerantList(
    containingType,
    listItemParser,
    optional(whitespace)
  );
}
;
export default whitespaceOptionalDelimitedList;
