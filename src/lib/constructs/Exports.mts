import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Production from '../Production.mjs';

export interface Exports extends GrokedThing {
    exportedSymbols: {
        [identifier: string]: Production;
    };
}
