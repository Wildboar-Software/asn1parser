import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ElementSetSpec } from './ElementSetSpec.mjs';
import { type ObjectSetElements } from './ObjectSetElements.mjs';

/**
 * A parenthesized object-set element set written with `Unions`.
 *
 * This is an interface so `ObjectSetElement` can refer to it recursively.
 * It has the same shape as `ElementSetSpec` with `unions`.
 */
interface ParenthesizedObjectSet extends GrokedThing {
  unions: {
    intersections: {
      elements: ObjectSetElement;
      exclusions?: ObjectSetElement;
    }[];
  }[];
}

/**
 * A parenthesized object-set element set written with `ALL EXCEPT`.
 */
interface ParenthesizedObjectSetAllExcept extends GrokedThing {
  allExcept: ObjectSetElement;
}

/**
 * One object-set element, or a parenthesized element set in that position.
 *
 * `Elements` in an object set may be an `ObjectSetElements` or
 * `"(" ElementSetSpec ")"`. The parenthesized alternative is how
 * `EXCEPT (referral | in-DSAReferral)` groups a union under `EXCEPT`.
 */
export type ObjectSetElement =
  | ObjectSetElements
  | ParenthesizedObjectSet
  | ParenthesizedObjectSetAllExcept;

export type ElementSetSpec_ObjectSet = ElementSetSpec<ObjectSetElement>;

/**
 * @summary Whether an object-set element is a nested element set.
 */
export function isObjectSetElementSetSpec(
  element: ObjectSetElement
): element is ElementSetSpec<ObjectSetElement> {
  return 'unions' in element || 'allExcept' in element;
}
