import Production from './Production.js';
import ProductionType from './ProductionType.js';
import parseFile from './parsers/file.js';
import type ParseContext from './interfaces/ParseContext.js';
import lex from './lex.js';

/**
 * @summary Parse the ASN.1 text, and lex them first if no lexemes are supplied.
 * @description
 * If `lexemes` are supplied, this will start parsing the lexemes, but
 * otherwise, will lex the `text` to produce them. The `lexemes` must have been
 * generated from the `text` if they are supplied separately.
 * @param {string} text The raw ASN.1 text that is to be parsed.
 * @param {Production[]} lexemes The lexemes returned from lexing.
 * @returns {ParseContext} The final resulting parser state after parsing is
 *  complete.
 * @function
 */
export default function parse(
  text: string,
  lexemes?: Production[]
): ParseContext {
  const lexemes_: Production[] = lexemes ?? Array.from(lex(text));
  const nonCommentLexemes = lexemes_.filter(
    (l: Production): boolean => l.type !== ProductionType.comment
  );
  const parseResult: ParseContext = parseFile.start(nonCommentLexemes, text);
  return parseResult;
}
