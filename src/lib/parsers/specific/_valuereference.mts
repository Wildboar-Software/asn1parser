import { literal } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const valuereference: Parser = literal(
  ProductionType.identifier,
  ProductionType.valuereference
);
export default valuereference;
