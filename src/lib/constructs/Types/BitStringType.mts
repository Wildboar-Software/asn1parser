import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type NamedNumber from '../NamedNumber.mjs';

// BitStringType ::=
//     BIT STRING
//     | BIT STRING "{" NamedBitList "}"

// NamedBitList ::=
//     NamedBit
// 	| NamedBitList "," NamedBit

// NamedBit ::=
//     identifier "(" number ")"
// 	| identifier "(" DefinedValue ")"

/**
 * An ASN.1 `BIT STRING` type, which is a sequence of bits.
 */
export default interface BitStringType extends GrokedThing {
  /**
   * The list of named bits, if any.
   */
  namedBitList?: NamedNumber[];
  /**
   * Whether the `BIT STRING` was defined without using the `DefinedValue`
   * production. If `true`, it means that there are no additional lookups
   * needed to resolve the numeric values of the named bits.
   */
  selfContained?: boolean;
}
