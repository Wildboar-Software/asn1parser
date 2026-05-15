import type Defined from '../../Defined.mjs';
import type ObjectClassDefn from './ObjectClassDefn.mjs';

// ObjectClass ::=
//     DefinedObjectClass
//     | ObjectClassDefn
//     | ParameterizedObjectClass

/**
 * An information object class, or a reference to one.
 */
export type ObjectClass = Defined | ObjectClassDefn;
