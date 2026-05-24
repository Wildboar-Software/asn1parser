import {
  choiceOf,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ModuleIdentifier ::= modulereference DefinitiveIdentification`
 *
 * NOTE: DefinitiveIdentification is optional, but its optionality is expressed
 * here, rather than in the DefinitiveIdentification parser itself, so that the
 * whitespace indicated by the UUID FC0C0C67-3CEE-466A-95BF-67BFE2274183 is not
 * consumed illegitimately.
 */
export const ModuleIdentifier: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.ModuleIdentifier, [
        parserFor.modulereference,
        optional(whitespace), // FC0C0C67-3CEE-466A-95BF-67BFE2274183
        parserFor.DefinitiveIdentification,
      ]),
      sequenceOf(ProductionType.ModuleIdentifier, [parserFor.modulereference]),
    ])
);
export default ModuleIdentifier;
