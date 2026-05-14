import { type Value } from '../Value.js';

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
