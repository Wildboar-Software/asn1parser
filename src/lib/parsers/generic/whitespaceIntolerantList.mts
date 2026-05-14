import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * @summary Parse a list of items that does not tolerate whitespace between
 *  delimiters and items.
 * @description
 * This parser factory produces a `Parser` that will parse a list of items. The
 * items must be parseable by `listItemParser`, and the delimiters must be
 * parseable by `delimiterParser` for the produced `Parser` to succeed.
 *
 * The produced `Parser` will not tolerate whitespace between list items and
 * their delimiters.
 *
 * Note that whitespace itself could be used as the delimiter. This is noted
 * because this technique is already in use in this library.
 *
 * @param {ProductionType} containingType The type of the `Production` that will
 *  subsume all parsed items of the list as children.
 * @param {Parser} listItemParser The `Parser` that will parse individual items
 *  of the list.
 * @param {Parser} delimiterParser The `Parser` that will parse the items that
 *  are used only syntactically to separate the semantic items of the list.
 * @returns {Parser} A `Parser` that will read a list of items parseable by
 *  `listItemParser` with delimiters parseable by `listItemParser`.
 * @function
 */
export default function (
  containingType: ProductionType,
  listItemParser: Parser,
  delimiterParser: Parser
): Parser {
  return new Parser(
    () => `Delimited List ${containingType}`,
    (state: ParseContext): ParseContext => {
      let nextState: ParseContext = listItemParser.execute(state);
      if (nextState.error) {
        state.log.debug(
          `Could not read first ${nextState.cst.type} list item for ${containingType}.`
        );
        return {
          ...state,
          error: true,
          cst: new Production(containingType, []),
        };
      }
      let children: Production[] = [nextState.cst];
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const delimiter = delimiterParser.execute(nextState);
        if (delimiter.error) {
          break;
        }
        state.log.debug(
          `Read ${delimiter.cst.type} delimiter for ${containingType}.`
        );

        const listItem = listItemParser.execute(delimiter);
        if (listItem.error) {
          break;
        }
        state.log.debug(
          `Read ${listItem.cst.type} list item for ${containingType}.`
        );

        nextState = listItem;
        children = children.concat([delimiter.cst, listItem.cst]);
        if (nextState.index >= nextState.tokens.length) {
          break;
        }
      }
      return {
        ...state,
        index: nextState.index,
        cst: new Production(containingType, children),
      };
    }
  );
}
