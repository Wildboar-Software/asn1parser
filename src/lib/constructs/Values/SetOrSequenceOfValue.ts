import { type Value } from '../Value.js';

// SequenceOfValue ::=
//     "{" ValueList "}"
// 	| "{" NamedValueList "}"
// 	| "{" "}"

// ValueList ::=
// 	Value
// 	| ValueList "," Value

// NamedValueList ::=
//     NamedValue
// 	| NamedValueList "," NamedValue

export type SetOrSequenceOfValue = {
  identifier?: string;
  value: Value;
}[];
