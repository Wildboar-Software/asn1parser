import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type SymbolsFromModule from './SymbolsFromModule.mjs';

/**
 * Imports of a module.
 */
export interface Imports extends GrokedThing {
    modulesInOriginalOrder: SymbolsFromModule[];
    modules: {
        [module: string]: SymbolsFromModule;
    };
}
