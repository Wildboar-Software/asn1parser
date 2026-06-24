import type Production from '../../Production.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import ProductionType from '../../ProductionType.mjs';
import split from '../../split.mjs';
import ASN1ParserExpectationError from '../../errors/ASN1ParserExpectationError.mjs';

// WithSyntaxSpec ::=
//     WITH SYNTAX SyntaxList

// SyntaxList ::=
//     "{" TokenOrGroupSpec empty + "}"

// TokenOrGroupSpec ::=
//     RequiredToken
//     | OptionalGroup

// OptionalGroup ::=
//     "[" TokenOrGroupSpec empty + "]"

// RequiredToken ::=
//     Literal
//     | PrimitiveFieldName

// Literal ::=
//     word
//     | ","

// PrimitiveFieldName ::=
//     typefieldreference
//     | valuefieldreference
//     | valuesetfieldreference
//     | objectfieldreference
//     | objectsetfieldreference

// DefinedSyntax ::=
//     "{" DefinedSyntaxToken empty * "}"

// DefinedSyntaxToken ::=
//     Literal
//     | Setting

// Setting ::=
//     Type
//     | Value
//     | ValueSet
//     | Object
//     | ObjectSet

/**
 * This code has been abandoned, because I realized that there was little value
 * in implementing this.
 */
// function constructParser (togs: Production, text: string): Parser {
//     if (togs.children.length === 0) {
//         throw new Error();
//     }
//     const togsalt = togs.children[0];
//     if (togsalt.type === ProductionType.RequiredToken) {
//         const rt = togsalt;
//         const rtalt = rt.children[0];
//         if (!rtalt) {
//             throw new Error();
//         }
//         if (rtalt.type === ProductionType.Literal) {
//             const lalt = rtalt.children[0];
//             if (!lalt) {
//                 throw new Error();
//             }
//             if (lalt.type === ProductionType.word) {
//                 return havingExactText(
//                     text.slice(lalt.location.startIndex, lalt.location.endIndex),
//                     aliasFor(
//                         ProductionType.DefinedSyntaxToken,
//                         aliasFor(
//                             ProductionType.Literal,
//                             parserFor.word,
//                         ),
//                     ),
//                 );
//             } else if (lalt.type === ProductionType.comma) {
//                 return aliasFor(
//                     ProductionType.DefinedSyntaxToken,
//                     literal(ProductionType.comma, ProductionType.Literal),
//                 );
//             } else {
//                 throw new Error();
//             }
//         } else if (rtalt.type === ProductionType.PrimitiveFieldName) {
//             const pfn = rtalt;
//             const pfnalt = pfn.children[0];
//             switch (pfnalt.type) {
//             case (ProductionType.typefieldreference):
//             case (ProductionType.valuesetfieldreference):
//             case (ProductionType.objectsetfieldreference):
//             {
//                 return aliasFor(
//                     ProductionType.DefinedSyntaxToken,
//                     choiceOf([
//                         parserFor.Type,
//                         parserFor.ValueSet,
//                         parserFor.ObjectSet,
//                     ], ProductionType.Setting),
//                 );
//             }
//             case (ProductionType.valuefieldreference):
//             case (ProductionType.objectfieldreference):
//             {
//                 return aliasFor(
//                     ProductionType.DefinedSyntaxToken,
//                     choiceOf([
//                         parserFor.Value,
//                         parserFor.Object,
//                     ], ProductionType.Setting),
//                 );
//             }
//             default: {
//                 throw new Error();
//             }
//             }
//         } else {
//             throw new Error();
//         }
//     } else if (togsalt.type === ProductionType.OptionalGroup) {
//         const og = togsalt;
//         return optional(sequenceOf(
//             ProductionType.OptionalGroup,
//             og.children
//                 .filter((child: Production): boolean => child.type === ProductionType.TokenOrGroupSpec)
//                 .flatMap((child) => [
//                     constructParser(child, text),
//                     optional(whitespace),
//                 ])
//                 .slice(0, -1), // Remove the last optional whitespace.
//         ));
//     } else {
//         throw new Error();
//     }
// }

const nonLiteralTokens: Set<string> = new Set<string>(['&', '[', ']', ',']);

// ObjectClassAssignment ::= objectclassreference "::=" ObjectClass
// ObjectClass ::= DefinedObjectClass | ObjectClassDefn | ParameterizedObjectClass
// ObjectClassDefn ::= CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?
// WithSyntaxSpec ::= WITH SYNTAX SyntaxList
// SyntaxList ::= "{" TokenOrGroupSpec empty + "}"

/**
 * @summary The callback called upon parsing an `ObjectClassAssignment`
 * @description
 * This adds all defined syntax tokens to the parsing context's set of
 * recognized defined syntax tokens so that, when parsing objects later on,
 * fewer mistakes are made as to which tokens are literals and which are
 * uppercased identifiers.
 * @param {ParseContext} ctx The parser state
 * @function
 */
export const onDidParseObjectClassAssignment = function onDidParseObjectClassAssignment(
  ctx: ParseContext
): void {
  const objectclassreference = ctx.cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.objectclassreference
  );
  const ObjectClass = ctx.cst.children.find(
    (child: Production): boolean => child.type === ProductionType.ObjectClass
  );
  if (!objectclassreference || !ObjectClass || !ObjectClass.children[0]) {
    throw new ASN1ParserExpectationError(
      "Unexpected ObjectClassAssignment structure",
      ctx.cst,
    );
  }
  if (ObjectClass.children[0].type !== ProductionType.ObjectClassDefn) {
    return;
  }
  const ObjectClassDefn = ObjectClass.children[0];
  const WithSyntaxSpec = ObjectClassDefn.children.find(
    (child: Production): boolean => child.type === ProductionType.WithSyntaxSpec
  );
  if (!WithSyntaxSpec) {
    return;
  }
  const SyntaxList =
    WithSyntaxSpec.children[WithSyntaxSpec.children.length - 1];
  if (!SyntaxList || SyntaxList.type !== ProductionType.SyntaxList) {
    throw new ASN1ParserExpectationError(
      "Unexpected WithSyntaxSpec structure",
      WithSyntaxSpec,
    );
  }
  const TokenOrGroupSpec = SyntaxList.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.TokenOrGroupSpec
  )!;

  split(TokenOrGroupSpec, ProductionType.whitespace)
    .map((token) =>
      ctx.text.slice(token.location.startIndex, token.location.endIndex)
    )
    .filter(
      (
        token: string
      ): boolean => // Only insert word literals.
        !nonLiteralTokens.has(token) && token.toUpperCase() === token
    )
    .forEach((token: string): void => {
      ctx.definedSyntaxTokens.add(token);
    });
};
export default onDidParseObjectClassAssignment;
