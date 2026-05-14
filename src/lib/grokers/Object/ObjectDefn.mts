import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import ProductionType from '../../ProductionType.mjs';
import { type ObjectDefn } from '../../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn.mjs';
import grokDefaultSyntax from './ObjectDefn/DefaultSyntax.mjs';
import grokDefinedSyntax from './ObjectDefn/DefinedSyntax.mjs';

// ObjectDefn ::=
//     DefaultSyntax
//     | DefinedSyntax

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

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

export default function grok(cst: Production, ctx: GrokContext): ObjectDefn {
  if (cst.children[0].type === ProductionType.DefaultSyntax) {
    return grokDefaultSyntax(cst.children[0], ctx);
  } else if (cst.children[0].type === ProductionType.DefinedSyntax) {
    return grokDefinedSyntax(cst.children[0], ctx);
  } else {
    throw new Error(
      `Unrecognized ObjectDefn alternative '${cst.children[0].type}'.`
    );
  }
}
