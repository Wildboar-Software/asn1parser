import {
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ModuleBody ::= Exports Imports AssignmentList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.ModuleBody, [
        parserFor.Exports,
        parserFor.Imports,
        parserFor.AssignmentList,
      ])
    )
);
