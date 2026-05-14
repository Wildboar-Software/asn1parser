import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type NamedType from  './NamedType.mjs';
import { type Value } from './Value.mjs';
import { type Type } from './Type.mjs';

// ComponentType ::=
//     NamedType
// 	| NamedType OPTIONAL
// 	| NamedType DEFAULT Value
// 	| COMPONENTS OF Type

interface Component extends GrokedThing {
  replicatedFromElsewhere?: boolean;
}

interface ComponentsOfComponent extends Component {
  componentsOf: Type; // Section 25.5 restricts this type to being a SEQUENCE type anyway.
}

interface NamedTypeComponent extends Component {
  namedType: NamedType;
  optional: boolean;
  default?: Value;
}

export type ComponentType = ComponentsOfComponent | NamedTypeComponent;
