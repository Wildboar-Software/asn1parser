import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { aliasFor, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';

export const modulereference: Parser = recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.modulereference, parserFor.typereference)
);
export default modulereference;
