import type GrokedThing from '../interfaces/GrokedThing.js';
import { NonTerminalProductionType } from '../ProductionType.js';
import type { ElementSetSpec } from './ElementSetSpec.js';

// ElementSetSpecs ::=
//     RootElementSetSpec
//      | RootElementSetSpec "," "..."
//      | RootElementSetSpec "," "..." "," AdditionalElementSetSpec

// RootElementSetSpec ::= ElementSetSpec
// AdditionalElementSetSpec ::= ElementSetSpec

export default interface ElementSetSpecs<ElementType> extends GrokedThing {
  productionType: NonTerminalProductionType.ElementSetSpecs;
  rootElementSetSpec: ElementSetSpec<ElementType>;
  additionalElementSetSpec?: ElementSetSpec<ElementType>;
  explicitlyExtensible: boolean;
}
