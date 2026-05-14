import type DefinedObject from '../../Defined.js';
import { type ObjectDefn } from './ObjectDefn.js';
import type ObjectFromObject from './ObjectFromObject.js';

// Object ::=
//     DefinedObject
//     | ObjectDefn
//     | ObjectFromObject
//     | ParameterizedObject

export type Object_ = DefinedObject | ObjectDefn | ObjectFromObject;
