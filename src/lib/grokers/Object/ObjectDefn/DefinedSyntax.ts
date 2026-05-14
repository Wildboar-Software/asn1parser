import type GrokContext from '../../../interfaces/GrokContext.js';
import type Production from '../../../Production.js';
import ProductionType from '../../../ProductionType.js';
import { type DefinedSyntax } from '../../../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefinedSyntax.js';
import { type Setting } from '../../../constructs/AssignmentTypes/ObjectAssignment/Setting.js';
import { type Literal } from '../../../constructs/AssignmentTypes/ObjectAssignment/Literal.js';
import grokSetting from '../Setting.js';

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
  return tokens.children
    .filter(
      (child: Production): boolean =>
        child.type === ProductionType.DefinedSyntaxToken
    )
    .map((dst: Production): Literal | Setting => {
      if (dst.children.length !== 1) {
        throw new Error();
      }
      const alt: Production = dst.children[0];
      if (alt.type === ProductionType.Literal) {
        return text.slice(dst.location.startIndex, dst.location.endIndex);
      } else if (alt.type === ProductionType.Setting) {
        return grokSetting(alt, ctx);
      } else {
        throw new Error(alt.type);
      }
    });
}
