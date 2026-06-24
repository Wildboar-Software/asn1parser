import type GrokContext from '../../../interfaces/GrokContext.mjs';
import type Production from '../../../Production.mjs';
import ProductionType from '../../../ProductionType.mjs';
import { type DefinedSyntax } from '../../../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefinedSyntax.mjs';
import { type Setting } from '../../../constructs/AssignmentTypes/ObjectAssignment/Setting.mjs';
import { type Literal } from '../../../constructs/AssignmentTypes/ObjectAssignment/Literal.mjs';
import grokSetting from '../Setting.mjs';
import ASN1ParserExpectationError from '../../../errors/ASN1ParserExpectationError.mjs';

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

// Literal ::=
//     word
//     | ","

export default function grok(cst: Production, ctx: GrokContext): DefinedSyntax {
  const text: string = ctx.text;
  const tokens = cst.children.filter(
    (child: Production): boolean =>
      child.type === ProductionType.DefinedSyntaxToken
  )[0];
  const grokedTokens = tokens.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.DefinedSyntaxToken
    )
    .map((dst: Production): Literal | Setting => {
      if (dst.children.length !== 1) {
        throw new ASN1ParserExpectationError(
          "DefinedSyntaxToken CST node had an unexpected number of child nodes",
          dst,
          ctx.currentModule.name,
        );
      }
      const alt: Production = dst.children[0];
      if (alt.type === ProductionType.Literal) {
        return text.slice(dst.location.startIndex, dst.location.endIndex);
      } else if (alt.type === ProductionType.Setting) {
        return grokSetting(alt, ctx);
      } else {
        throw new ASN1ParserExpectationError(
          "DefinedSyntaxToken CST node had an unexpected variant: " + alt.type,
          alt,
          ctx.currentModule.name,
        );
      }
    });
  return {
    tokens: grokedTokens,
    production: cst,
    productionType: cst.type,
  };
}
