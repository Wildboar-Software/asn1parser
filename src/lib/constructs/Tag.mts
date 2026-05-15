import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Defined from './Defined.mjs';

/**
 * A tag for an ASN.1 value / encoding.
 * 
 * ```bnf
 * Tag ::= "[" EncodingReference Class ClassNumber "]"
 * EncodingReference ::= encodingreference ":" | empty
 * ClassNumber ::= number | DefinedValue
 * Class ::= UNIVERSAL | APPLICATION | PRIVATE | empty
 * ```
 */
export default interface Tag extends GrokedThing {
  /** Reference to rules for encoding using Encoding Control Notation (ECN). */
  encodingReference?: string;
  /** Tag class, such as "UNIVERSAL", "APPLICATION", or "PRIVATE", as a string. */
  class_: string;
  /** The class number of the tag. */
  classNumber: number | Defined;
}
