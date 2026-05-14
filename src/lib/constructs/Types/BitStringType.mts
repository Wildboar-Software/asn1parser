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

export default interface BitStringType extends GrokedThing {
  namedBitList?: NamedNumber[];
  selfContained?: boolean;
}
