import { type Value } from '../Value.mjs';

// SequenceValue ::=
//     "{" ComponentValueList "}"
//     | "{" "}"

// ComponentValueList ::=
//     NamedValue
// 	| ComponentValueList "," NamedValue

export type SetOrSequenceValue = {
  identifier: string;
  value: Value;
}[];
