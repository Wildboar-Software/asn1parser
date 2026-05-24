import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinitiveNameAndNumberForm ::= identifier "(" DefinitiveNumberForm ")"`
 */
export const DefinitiveNameAndNumberForm: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefinitiveNameAndNumberForm, [
      literal(ProductionType.identifier),
      literal(ProductionType.parenthesisOpening),
      parserFor.DefinitiveNumberForm,
      assert(
        literal(ProductionType.parenthesisClosing),
        choiceOf([
          parserFor.DefinitiveObjIdComponent,
          literal(ProductionType.curlyClosing),
        ]),
        'CB4879D7-49F6-4F62-8EC1-34D2C9DE1B2E'
      ),
    ])
);
export default DefinitiveNameAndNumberForm;
