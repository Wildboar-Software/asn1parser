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
  /** The root objects of the object set */
  rootElementSetSpec?: ElementSetSpec<ObjectSetElements>;
  /** The additional objects added after extension */
  additionalElementSetSpec?: ElementSetSpec<ObjectSetElements>;
  /** Whether the object set is explicitly extensible */
  explicitlyExtensible: boolean;
}
