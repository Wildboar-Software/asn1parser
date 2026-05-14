import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `DefinedType ::= ExternalTypeReference | typereference | ParameterizedType | ParameterizedValueSetType`
 */
export default recursiveParser(
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
