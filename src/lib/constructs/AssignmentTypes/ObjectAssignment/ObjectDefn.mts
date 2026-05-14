import { type DefaultSyntax } from './ObjectDefn/DefaultSyntax.js';
import { type DefinedSyntax } from './ObjectDefn/DefinedSyntax.js';

// ObjectDefn ::=
//     DefaultSyntax
//     | DefinedSyntax

// DefaultSyntax ::=
//     "{" FieldSetting "," * "}"

// FieldSetting ::=
//     PrimitiveFieldName Setting

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

// PrimitiveFieldName ::=
//     typefieldreference
//     | valuefieldreference
//     | valuesetfieldreference
//     | objectfieldreference
//     | objectsetfieldreference

export type ObjectDefn = DefaultSyntax | DefinedSyntax;
