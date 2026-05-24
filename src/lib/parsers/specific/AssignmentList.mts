import { recursiveParser, whitespaceDelimitedList } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AssignmentList ::= Assignment | AssignmentList Assignment`
 */
export const AssignmentList: Parser = recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(ProductionType.AssignmentList, parserFor.Assignment)
);
export default AssignmentList;
