import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectDefn ::= DefaultSyntax | DefinedSyntax`
 * `DefinedSyntax ::= "{" DefinedSyntaxToken empty * "}"`
 * `DefaultSyntax ::= "{" FieldSetting "," * "}"`
 * `DefinedSyntaxToken ::= Literal | Setting`
 * `Literal ::= word | ","`
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 * `FieldSetting ::= PrimitiveFieldName Setting`
 */
export const ObjectDefn: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        /**
         * The ordering here is correct, because if the first token it reads within
         * the curly brackets does not begin with an ampersand (hence, not a field
         * reference), it can safely assume it is not a `DefaultSyntax`, and proceed
         * to the `DefinedSyntax` alternative.
         */
        parserFor.DefaultSyntax,
        parserFor.DefinedSyntax,
      ],
      ProductionType.ObjectDefn
    )
);
export default ObjectDefn;
