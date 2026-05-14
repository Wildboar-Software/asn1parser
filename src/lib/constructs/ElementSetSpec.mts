import type GrokedThing from '../interfaces/GrokedThing.mjs';

interface ElementSetSpecWithUnions<ElementType> extends GrokedThing {
  unions: {
    intersections: {
      elements: ElementType;
      exclusions?: ElementType;
    }[];
  }[];
}

interface ElementSetSpecWithAllExcept<ElementType> extends GrokedThing {
  allExcept: ElementType;
}

export type ElementSetSpec<ElementType> =
  | ElementSetSpecWithUnions<ElementType>
  | ElementSetSpecWithAllExcept<ElementType>;
