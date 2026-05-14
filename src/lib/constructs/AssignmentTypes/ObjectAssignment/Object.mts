import type DefinedObject from '../../Defined.mjs';
import { type ObjectDefn } from './ObjectDefn.mjs';
import type ObjectFromObject from './ObjectFromObject.mjs';

// Object ::=
//     DefinedObject
//     | ObjectDefn
//     | ObjectFromObject
//     | ParameterizedObject

export type Object_ = DefinedObject | ObjectDefn | ObjectFromObject;
