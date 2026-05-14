import type ElementSetSpecs from './ElementSetSpecs.js';

// ValueSet ::= "{" ElementSetSpecs "}"

export type ValueSet = ElementSetSpecs<string>;
