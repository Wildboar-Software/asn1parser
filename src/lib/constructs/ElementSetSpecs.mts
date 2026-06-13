import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { NonTerminalProductionType } from '../ProductionType.mjs';
import type { ElementSetSpec } from './ElementSetSpec.mjs';

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

  /**
   * Whether the set was explicitly extensible from the use of the ellipsis
   * (`...`).
   */
  explicitlyExtensible: boolean;
}
