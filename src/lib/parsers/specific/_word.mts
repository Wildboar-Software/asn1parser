import { choiceOf, literal } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import keywordsPermissibleAsLiterals from '../../keywordsPermissibleAsLiterals.mjs';

export const word: Parser = choiceOf(
  [
    // literal(ProductionType.typereference), // Words may only contain uppercase letters.
    literal(ProductionType.objectclassreference),

    /**
     * Other symbols that are all uppercased, but not explicitly forbidden
     * for use as a `word`.
     */
    ...Array.from(keywordsPermissibleAsLiterals).map((keyword) =>
      literal(keyword)
    ),
  ],
  ProductionType.word
);
export default word;
