import type GrokedThing from '../interfaces/GrokedThing.js';
import type Defined from './Defined.js';

// TaggedType ::=
// 	Tag Type
// 	| Tag IMPLICIT Type
// 	| Tag EXPLICIT Type

// Tag ::=
// 	"[" EncodingReference Class ClassNumber "]"

// EncodingReference ::=
//     encodingreference ":"
// 	| empty

// ClassNumber ::=
//     number
// 	| DefinedValue

// Class ::=
//     UNIVERSAL
// 	| APPLICATION
// 	| PRIVATE
// 	| empty

export default interface Tag extends GrokedThing {
  encodingReference?: string;
  class_: string;
  classNumber: number | Defined;
}
