import type GrokedThing from '../../interfaces/GrokedThing.js';
import type NamedNumber from '../NamedNumber.js';

// BitStringType ::=
//     BIT STRING
//     | BIT STRING "{" NamedBitList "}"

// NamedBitList ::=
//     NamedBit
// 	| NamedBitList "," NamedBit

// NamedBit ::=
//     identifier "(" number ")"
// 	| identifier "(" DefinedValue ")"

export default interface BitStringType extends GrokedThing {
  namedBitList?: NamedNumber[];
  selfContained?: boolean;
}
