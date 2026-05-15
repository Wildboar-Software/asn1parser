import type GrokedThing from '../interfaces/GrokedThing.mjs';

/**
 * An object identifier arc as a name only.
 */
interface NameOnly extends GrokedThing {
  name: string;
}

/**
 * An object identifier arc as a number only.
 */
interface NumberOnly extends GrokedThing {
  number: number;
}

/**
 * An object identifier arc as a name and a number.
 */
interface NameAndNumber extends NameOnly, NumberOnly {}

/**
 * An object identifier arc as a name or a number or a name and a number.
 */
export type NameAndOrNumber = NameOnly | NumberOnly | NameAndNumber;
