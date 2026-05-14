import {
  anything,
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionAdditionAlternativesGroup ::= "[[" VersionNumber AlternativeTypeList "]]"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(
      ProductionType.ExtensionAdditionAlternativesGroup,
      [
        literal(ProductionType.squareOpening),
        assert(
          literal(ProductionType.squareOpening),
          literal(ProductionType.squareClosing),
          '07FCEF6C-FBC9-433D-A22C-0D94CA6C2586'
        ),
        parserFor.VersionNumber,
        assert(
          parserFor.AlternativeTypeList,
          literal(ProductionType.squareClosing),
          '78A6387E-6637-49BA-87E7-DB472D56A6A6'
        ),
        assert(
          literal(ProductionType.squareClosing),
          literal(ProductionType.squareClosing),
          'C30519D6-5480-40E5-AE34-A3A647E30001'
        ),
        assert(
          literal(ProductionType.squareClosing),
          anything,
          'FC878FC9-77DD-434A-9D25-E7DA8A5E9C3C'
        ),
      ]
    )
);
