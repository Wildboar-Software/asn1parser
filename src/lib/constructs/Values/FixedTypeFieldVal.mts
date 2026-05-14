import { type Value } from '../Value.mjs';

// FixedTypeFieldVal ::= BuiltinValue | ReferencedValue
// FixedTypeFieldVal is a subset of Value, but close enough to being identical.
export type FixedTypeFieldVal = Value;
