import {
  aliasFor,
  choiceOf,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * @summary Separate parser for an `ObjectClassFieldType` to avoid parsing
 *  under-reads.
 * @description
 * This parser exists so that it can be used as an alternative in a `choiceOf`
 * parser that can come before `DefinedObjectClass` is read. This is important,
 * because reading a `DefinedObjectClass` before `ObjectClassFieldType` can
 * result in parser under-reads.
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        whitespaceTolerantSequenceOf(ProductionType.ConstrainedType, [
          aliasFor(
            ProductionType.Type,
            aliasFor(ProductionType.BuiltinType, parserFor.ObjectClassFieldType)
          ),
          whitespaceOptionalDelimitedList(
            ProductionType.Constraints,
            parserFor.Constraint
          ),
        ]),
        aliasFor(ProductionType.BuiltinType, parserFor.ObjectClassFieldType),
      ],
      ProductionType.Type
    )
);
