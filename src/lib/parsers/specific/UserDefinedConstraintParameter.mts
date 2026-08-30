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
import { ProductionType } from '../../ProductionType.mjs';
import Value from '../optimized/Value_listens_to_currentType.mjs';
import updateCurrentType from '../../updateCurrentType.mjs';

/**
 * `Governor ::= Type | DefinedObjectClass`
 */

/**
 * `UserDefinedConstraintParameter ::=
 *      Governor ":" Value
 *      | Governor ":" Object
 *      | Type
 *      | DefinedObjectClass
 *      | DefinedObjectSet`
 *
 * `Type` is attempted before `DefinedObjectSet` and `DefinedObjectClass`.
 * Those latter productions are prefixes of `ParameterizedType`
 * (`SimpleDefinedType ActualParameterList`), which is a `Type`. If the shorter
 * productions are tried first, `CAMEL-AChBillingChargingCharacteristics {bound}`
 * is accepted as a bare reference and `{bound}` is left unconsumed, so the
 * enclosing `UserDefinedConstraint` fails looking for `}`.
 *
 * `Governor ":" Value` / `Governor ":" Object` must still precede `Type`, so
 * that `INTEGER: 5` is not accepted as a `Type` that leaves `: 5` behind.
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
      aliasFor(ProductionType.UserDefinedConstraintParameter, parserFor.Type),
      /**
       * `DefinedObjectClass` is a narrower subset of `DefinedObjectSet` (an
       * `objectclassreference` is a restricted `typereference` /
       * `objectsetreference`), so it is tried first among the remaining
       * reference productions. `TYPE-IDENTIFIER` and `ABSTRACT-SYNTAX` are
       * reserved words that `Type` will not accept as a `typereference`.
       */
      aliasFor(
        ProductionType.UserDefinedConstraintParameter,
        parserFor.DefinedObjectClass
      ),
      aliasFor(
        ProductionType.UserDefinedConstraintParameter,
        parserFor.DefinedObjectSet
      ),
    ])
);
export default UserDefinedConstraintParameter;
