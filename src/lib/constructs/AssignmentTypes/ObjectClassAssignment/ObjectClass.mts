import type Defined from '../../Defined.mjs';
import type ObjectClassDefn from './ObjectClassDefn.mjs';

// ObjectClass ::=
//     DefinedObjectClass
//     | ObjectClassDefn
//     | ParameterizedObjectClass

export type ObjectClass = Defined | ObjectClassDefn;
