import type Defined from '../../Defined.js';
import type ObjectClassDefn from './ObjectClassDefn.js';

// ObjectClass ::=
//     DefinedObjectClass
//     | ObjectClassDefn
//     | ParameterizedObjectClass

export type ObjectClass = Defined | ObjectClassDefn;
