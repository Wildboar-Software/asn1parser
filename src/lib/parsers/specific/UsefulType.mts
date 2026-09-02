import { dispatchOnToken, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

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
    dispatchOnToken(
      {
        [ProductionType._UTCTime]: literal(ProductionType._UTCTime),
        [ProductionType._GeneralizedTime]: literal(
          ProductionType._GeneralizedTime
        ),
        [ProductionType._ObjectDescriptor]: literal(
          ProductionType._ObjectDescriptor
        ),
      },
      ProductionType.UsefulType
    )
);
export default UsefulType;
