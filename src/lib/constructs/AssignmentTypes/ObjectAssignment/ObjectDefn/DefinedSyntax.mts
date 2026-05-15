import type GrokedThing from '../../../../interfaces/GrokedThing.mjs';
import { type Literal } from '../Literal.mjs';
import { type Setting } from '../Setting.mjs';

export interface DefinedSyntax extends GrokedThing {
    tokens: (Literal | Setting)[];
}
