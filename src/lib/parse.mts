import Production from './Production.mjs';
import { ProductionType } from './ProductionType.mjs';
import parseFile from './parsers/file.mjs';
import type ParseContext from './interfaces/ParseContext.mjs';
import lex from './lex.mjs';
import ASN1SyntaxError from './errors/ASN1SyntaxError.mjs';

/**
 * @summary Parse the ASN.1 text, and lex them first if no lexemes are supplied.
 * @description
 * If `lexemes` are supplied, this will start parsing the lexemes, but
 * otherwise, will lex the `text` to produce them. The `lexemes` must have been
 * generated from the `text` if they are supplied separately.
 *
 * Comment tokens and lexer `SYNTAX_ERROR` tokens (unrecognized characters
 * and invalid numbers with leading zeros) are omitted from the parser input
 * so the rest of the file can still be parsed. Lexer `SYNTAX_ERROR` tokens
 * are recorded in `syntaxErrors`.
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
  const lexerSyntaxErrors: Record<number, ASN1SyntaxError> = {};
  const parseableLexemes = lexemes_.filter((l: Production): boolean => {
    if (l.type === ProductionType.SYNTAX_ERROR) {
      const lexeme = text.slice(l.location.startIndex, l.location.endIndex);
      const message = /^0\d+$/.test(lexeme)
        ? `Number with leading zeros at index ${l.location.startIndex}.`
        : `Unrecognized character at index ${l.location.startIndex}.`;
      lexerSyntaxErrors[l.location.startIndex] = new ASN1SyntaxError(
        l,
        message,
      );
      return false;
    }
    return l.type !== ProductionType.comment;
  });
  const parseResult: ParseContext = parseFile.start(parseableLexemes, text);
  for (const [index, error] of Object.entries(lexerSyntaxErrors)) {
    const key = Number(index);
    if (!(key in parseResult.syntaxErrors)) {
      parseResult.syntaxErrors[key] = error;
    }
  }
  return parseResult;
}
