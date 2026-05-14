import type GrokedThing from '../interfaces/GrokedThing.js';
import type NamedType from  './NamedType.js';
import { type Value } from './Value.js';
import { type Type } from './Type.js';

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
