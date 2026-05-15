import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type SymbolsFromModule from './SymbolsFromModule.mjs';

export interface Imports extends GrokedThing {
    modules: {
        [module: string]: SymbolsFromModule;
    };
}
