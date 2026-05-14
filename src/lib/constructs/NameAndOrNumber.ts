import type GrokedThing from '../interfaces/GrokedThing.js';

interface NameOnly extends GrokedThing {
  name: string;
}

interface NumberOnly extends GrokedThing {
  number: number;
}

interface NameAndNumber extends NameOnly, NumberOnly {}

export type NameAndOrNumber = NameOnly | NumberOnly | NameAndNumber;
