import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ElementSetSpec_ObjectSet } from './ElementSetSpec_ObjectSet.mjs';
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
  rootElementSetSpec?: ElementSetSpec_ObjectSet;
  /** The additional objects added after extension */
  additionalElementSetSpec?: ElementSetSpec_ObjectSet;
  /** Whether the object set is explicitly extensible */
  explicitlyExtensible: boolean;
}
