import {
  aliasFor,
  choiceOf,
  doif,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import Value from '../optimized/Value_listens_to_currentType.js';
import updateCurrentType from '../../updateCurrentType.js';

/**
 * `Governor ::= Type | DefinedObjectClass`
 */

/**
 * `UserDefinedConstraintParameter ::=
 *      Governor ":" Value
 *      | Governor ":" Object
 *      | DefinedObjectSet
 *      | Type
 *      | DefinedObjectClass`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(
        ProductionType.UserDefinedConstraintParameter,
        [
          aliasFor(
            ProductionType.Governor,
            doif(parserFor.Type, updateCurrentType)
          ),
          literal(ProductionType.colon),
          Value,
        ]
      ),
      whitespaceTolerantSequenceOf(
        ProductionType.UserDefinedConstraintParameter,
        [parserFor.Governor, literal(ProductionType.colon), parserFor.Object]
      ),
      /**
       * You parse the `DefinedObjectClass` before `DefinedObjectSet` because
       * `DefinedObjectClass` is a narrower subset of `DefinedObjectSet`.
       */
      aliasFor(
        ProductionType.UserDefinedConstraintParameter,
        parserFor.DefinedObjectClass
      ),
      aliasFor(
        ProductionType.UserDefinedConstraintParameter,
        parserFor.DefinedObjectSet
      ),
      aliasFor(ProductionType.UserDefinedConstraintParameter, parserFor.Type),
    ])
);
