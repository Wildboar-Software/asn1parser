import { literal } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const objectreference: Parser = literal(
  ProductionType.identifier,
  ProductionType.objectreference
);
export default objectreference;
