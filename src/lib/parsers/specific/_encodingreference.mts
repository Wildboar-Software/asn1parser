import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import { aliasFor, literal, recursiveParser } from '../generic/index.mjs';

/**
 * An "encodingreference" shall consist of a sequence of characters as specified
 * for a "typereference" in 12.2, except that no lower-case letters shall be
 * included.
 */
export default recursiveParser(
  (): Parser =>
    aliasFor(
      ProductionType.encodingreference,
      literal(ProductionType.objectclassreference)
    )
);
