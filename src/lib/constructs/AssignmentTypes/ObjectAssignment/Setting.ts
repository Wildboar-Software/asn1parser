import { type Type } from '../../Type.js';
import { type Value } from '../../Value.js';
import { type ValueSet } from '../../ValueSet.js';
import { type Object_ } from '../../AssignmentTypes/ObjectAssignment/Object.js';
import { type ObjectSet } from '../../ObjectSet.js';
import type GrokedThing from '../../../interfaces/GrokedThing.js';

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

export type Setting =
  | TypeSetting
  | ValueSetting
  | ValueSetSetting
  | ObjectSetting
  | ObjectSetSetting;
