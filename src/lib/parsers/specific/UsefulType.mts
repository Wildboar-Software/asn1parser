import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * Though the definition of `UsefulType` is this:
 *
 * `UsefulType ::= typereference`
 *
 * Its actual purpose, according to ITU X.680 2015, Section 45, is to encompass
 * `UTCTime`, `GeneralizedTime`, and `ObjectDescriptor`. This is largely the
 * product of a historical accident.
 */
export const UsefulType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType._UTCTime),
        literal(ProductionType._GeneralizedTime),
        literal(ProductionType._ObjectDescriptor),
        /**
         * The following is intentionally commented out to prevent ReferencedType
         * parsing from being terminated prematurely. UsefulType is only used by
         * ReferencedType, so this alteration of its definition is fine, so long
         * as typereference gets attempted eventually by ReferencedType.
         */
        // parserFor.typereference,
      ],
      ProductionType.UsefulType
    )
);
export default UsefulType;
