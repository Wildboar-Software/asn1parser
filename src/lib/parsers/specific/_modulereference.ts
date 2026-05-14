import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import { aliasFor, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';

export default recursiveParser(
  (): Parser =>
    aliasFor(ProductionType.modulereference, parserFor.typereference)
);
