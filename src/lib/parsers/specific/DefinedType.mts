import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `DefinedType ::= ExternalTypeReference | typereference | ParameterizedType | ParameterizedValueSetType`
 */
export const DefinedType: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.ParameterizedType,
        parserFor.ExternalTypeReference,
        // parserFor.ParameterizedValueSetType, // This has the same syntax as ParameterizedType.
        /**
         * The following is intentionally commented out to prevent ReferencedType
         * parsing from being terminated prematurely. DefinedType is only used by
         * ReferencedType, so this alteration of its definition is fine, so long
         * as typereference gets attempted eventually by ReferencedType.
         */
        // parserFor.typereference,
      ],
      ProductionType.DefinedType
    )
);
export default DefinedType;
