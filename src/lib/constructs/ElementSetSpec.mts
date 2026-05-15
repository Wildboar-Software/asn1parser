import type GrokedThing from '../interfaces/GrokedThing.mjs';

interface ElementSetSpecWithUnions<ElementType> extends GrokedThing {
  unions: {
    intersections: {
      /**
       * This is named using plural only as a reflection of the ASN.1 ABNF
       * definition. It is, in fact, unlikely to be an array.
       */
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
