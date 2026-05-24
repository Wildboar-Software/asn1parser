import {
  aliasFor,
  choiceOf,
  doif,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import Value from '../optimized/Value_listens_to_currentType.mjs';
import updateCurrentType from '../../updateCurrentType.mjs';

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
export const UserDefinedConstraintParameter: Parser = recursiveParser(
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
export default UserDefinedConstraintParameter;
