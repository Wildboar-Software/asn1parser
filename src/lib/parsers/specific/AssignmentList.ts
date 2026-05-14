import { recursiveParser, whitespaceDelimitedList } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `AssignmentList ::= Assignment | AssignmentList Assignment`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(ProductionType.AssignmentList, parserFor.Assignment)
);
