import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import anythingUntil from './anythingUntil.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

/**
 * @summary Produce a `Parser` that will produce a syntax error if it fails.
 * @description
 * This parser will attempt to parse with the `asserted` parser, and if that
 * fails, it will fast-forward through tokens until the `recovery` parser
 * succeeds.
 *
 * If the recovery token never appears, the scan stops at end of input, a
 * syntax error is recorded, and this parser still succeeds so the rest of
 * the file can be parsed.
 *
 * This is for scenarios where a parsing syntax could be said with certainty to
 * be incorrect a run time. For instance, when parsing an `ExtensionDefault`,
 * the ASN.1 keyword `EXTENSIBILITY` must always be followed by an `IMPLIED`, so
 * if `EXTENSIBILITY` is encountered, the subsequent `IMPLIED` can be asserted
 * with a parser produced by this function.
 *
 * @param {Parser} asserted The parser whose success is to be asserted.
 * @param {Parser} recovery The parser to fast-forward to in case of a failed
 *  assertion so the parsing state can "re-align."
 * @param {string} uuid A UUID to uniquely identify the assertion error.
 * @returns {Parser} The parser that will assert the `asserted` parser.
 * @function
 */
export const assert = function (
  asserted: Parser,
  recovery: Parser,
  uuid: string
): Parser {
  return new Parser(
    () => 'Assertion',
    (state: ParseContext): ParseContext => {
      const result = asserted.execute(state);
      if (result.error) {
        const recoveryResult = anythingUntil(
          ProductionType.SYNTAX_ERROR,
          recovery
        ).execute(state);
        // `anythingUntil` fails when the recovery token is absent. Keep the
        // skipped tokens and continue so the rest of the module can parse.
        if (recoveryResult.error) {
          delete recoveryResult.error;
        }
        const key: number = result.cst.location.startIndex;
        if (!(key in recoveryResult.syntaxErrors)) {
          recoveryResult.syntaxErrors[key] = new ASN1SyntaxError(
            recoveryResult.cst,
            `urn:uuid:${uuid}: Required production '${asserted.name()}' not found.`
          );
        }
        return recoveryResult;
      } else {
        return result;
      }
    }
  );
}
;
export default assert;
