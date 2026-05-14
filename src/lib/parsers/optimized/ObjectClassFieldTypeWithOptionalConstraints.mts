import {
  aliasFor,
  choiceOf,
  recursiveParser,
  whitespaceOptionalDelimitedList,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
