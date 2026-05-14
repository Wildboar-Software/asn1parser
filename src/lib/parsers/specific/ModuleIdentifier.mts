import {
  choiceOf,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ModuleIdentifier ::= modulereference DefinitiveIdentification`
 *
 * NOTE: DefinitiveIdentification is optional, but its optionality is expressed
 * here, rather than in the DefinitiveIdentification parser itself, so that the
 * whitespace indicated by the UUID FC0C0C67-3CEE-466A-95BF-67BFE2274183 is not
 * consumed illegitimately.
 */
export default recursiveParser(
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
