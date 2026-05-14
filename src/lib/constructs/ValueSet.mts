import type ElementSetSpecs from './ElementSetSpecs.mjs';

// ValueSet ::= "{" ElementSetSpecs "}"

export type ValueSet = ElementSetSpecs<string>;
