import {
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
