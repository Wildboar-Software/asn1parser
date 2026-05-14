import { type Value } from '../Value.js';

// FixedTypeFieldVal ::= BuiltinValue | ReferencedValue
// FixedTypeFieldVal is a subset of Value, but close enough to being identical.
export type FixedTypeFieldVal = Value;
