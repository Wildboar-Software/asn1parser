import type GrokedThing from '../interfaces/GrokedThing.js';
import { type ElementSetSpec } from './ElementSetSpec.js';
import { type ObjectSetElements } from './ObjectSetElements.js';
import { NonTerminalProductionType } from '../ProductionType.js';

// ObjectSet ::=
//     "{" ObjectSetSpec "}"

// ObjectSetSpec ::=
//     RootElementSetSpec
//     | RootElementSetSpec "," "..."
//     | "..."
//     | "..." "," AdditionalElementSetSpec
//     | RootElementSetSpec "," "..." "," AdditionalElementSetSpec

export default interface ObjectSetSpec extends GrokedThing {
  productionType: NonTerminalProductionType.ObjectSetSpec;
  rootElementSetSpec?: ElementSetSpec<ObjectSetElements>;
  additionalElementSetSpec?: ElementSetSpec<ObjectSetElements>;
  explicitlyExtensible: boolean;
}
