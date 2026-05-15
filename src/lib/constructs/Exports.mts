import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Production from '../Production.mjs';

/**
 * Exports of a module.
 */
export interface Exports extends GrokedThing {
    exportedSymbols: {
        [identifier: string]: Production;
    };
}
