import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import whitespace from './whitespace.mjs';

/**
 * @summary Parse a list of items that tolerates whitespace between delimiters
 *  and items.
 * @description
 * This parser factory produces a `Parser` that will parse a list of items. The
 * items must be parseable by `listItemParser`, and the delimiters must be
 * parseable by `delimiterParser` for the produced `Parser` to succeed.
 *
 * The produced `Parser` will tolerate whitespace between list items and their
 * delimiters.
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
    () =>
      `Whitespace-Tolerant ${delimiterParser.name()}-delimited List ${containingType}`,
    (state: ParseContext): ParseContext => {
      let children: Production[] = [];
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
      children.push(nextState.cst);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const listItemASTs: Production[] = [];
        const whitespace1 = whitespace.execute(nextState);
        if (whitespace1.error) {
          // It is not a problem if there is no whitespace in front of the delimiter.
          delete whitespace1.error;
        } else {
          state.log.debug(
            `Read whitespace before delimiter for ${containingType}.`
          );
          listItemASTs.push(whitespace1.cst);
        }

        const delimiter = delimiterParser.execute(whitespace1);
        if (delimiter.error) {
          if (listItemASTs.length === 1) {
            listItemASTs.pop();
          }
          break;
        }
        state.log.debug(`Read delimiter in ${containingType}.`);
        listItemASTs.push(delimiter.cst);

        const whitespace2 = whitespace.execute(delimiter);
        if (whitespace2.error) {
          // It is not a problem if there is no whitespace after the delimiter.
          delete whitespace2.error;
        } else {
          state.log.debug(
            `Read whitespace after delimiter for ${containingType}.`
          );
          listItemASTs.push(whitespace2.cst);
        }

        const listItem = listItemParser.execute(whitespace2);
        if (listItem.error) {
          break;
        }
        state.log.debug(
          `Read ${nextState.cst.type} list item for ${containingType}.`
        );
        listItemASTs.push(listItem.cst);

        children = children.concat(listItemASTs);
        nextState = listItem;
        if (listItem.index >= listItem.tokens.length) {
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
