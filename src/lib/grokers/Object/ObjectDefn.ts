import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import { type ObjectDefn } from '../../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn.js';
import grokDefaultSyntax from './ObjectDefn/DefaultSyntax.js';
import grokDefinedSyntax from './ObjectDefn/DefinedSyntax.js';

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
