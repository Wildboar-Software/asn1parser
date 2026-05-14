import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ElementSetSpec } from './ElementSetSpec.mjs';
import { type ObjectSetElements } from './ObjectSetElements.mjs';
import { NonTerminalProductionType } from '../ProductionType.mjs';

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
