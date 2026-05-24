import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const DefinitiveOIDandIRI: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.DefinitiveOIDandIRI, [
      parserFor.DefinitiveOID,
      parserFor.IRIValue,
    ])
);
export default DefinitiveOIDandIRI;
