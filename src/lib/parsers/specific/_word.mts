import { choiceOf, literal } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import keywordsPermissibleAsLiterals from '../../keywordsPermissibleAsLiterals.mjs';

const alternatives: Parser[] = [
  // literal(ProductionType.typereference), // Words may only contain uppercase letters.
  literal(ProductionType.objectclassreference),
];

/**
 * Other symbols that are all uppercased, but not explicitly forbidden
 * for use as a `word`.
 */
for (const keyword of keywordsPermissibleAsLiterals) {
  alternatives.push(literal(keyword));
}

export const word: Parser = choiceOf(alternatives, ProductionType.word);
export default word;
