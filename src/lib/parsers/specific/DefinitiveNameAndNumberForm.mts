import {
  assert,
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DefinitiveNameAndNumberForm ::= identifier "(" DefinitiveNumberForm ")"`
 */
export default recursiveParser(
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
