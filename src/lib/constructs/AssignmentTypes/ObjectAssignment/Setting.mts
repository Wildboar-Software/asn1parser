import { type Type } from '../../Type.mjs';
import { type Value } from '../../Value.mjs';
import { type ValueSet } from '../../ValueSet.mjs';
import { type Object_ } from '../../AssignmentTypes/ObjectAssignment/Object.mjs';
import { type ObjectSet } from '../../ObjectSet.mjs';
import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

export interface TypeSetting extends GrokedThing {
  type: Type;
}

export interface ValueSetting extends GrokedThing {
  value: Value;
}

export interface ValueSetSetting extends GrokedThing {
  valueSet: ValueSet;
}

export interface ObjectSetting extends GrokedThing {
  object: Object_;
}

export interface ObjectSetSetting extends GrokedThing {
  objectSet: ObjectSet;
}

/**
 * A setting for an ASN.1 information object.
 * 
 * ```bnf
 * Setting ::= Type | Value | ValueSet | Object | ObjectSet
 * ```
 */
export type Setting =
  | TypeSetting
  | ValueSetting
  | ValueSetSetting
  | ObjectSetting
  | ObjectSetSetting;
