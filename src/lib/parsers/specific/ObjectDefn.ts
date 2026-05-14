import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectDefn ::= DefaultSyntax | DefinedSyntax`
 * `DefinedSyntax ::= "{" DefinedSyntaxToken empty * "}"`
 * `DefaultSyntax ::= "{" FieldSetting "," * "}"`
 * `DefinedSyntaxToken ::= Literal | Setting`
 * `Literal ::= word | ","`
 * `Setting ::= Type | Value | ValueSet | Object | ObjectSet`
 * `FieldSetting ::= PrimitiveFieldName Setting`
 */
export default recursiveParser(
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
