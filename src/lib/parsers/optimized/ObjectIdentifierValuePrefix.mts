import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';
import * as parserFor from '../specific/index.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import builtinRootArcNamesToNumber from '../../builtinRootArcNamesRootNumber.mjs';

export const ObjectIdentifierValuePrefix = new Parser(
    () => "OBJECT IDENTIFIER DefinedValue prefix",
    (state: ParseContext): ParseContext => {
        // const currentloc = state.tokens[state.index].location;
        const dvstate = parserFor.DefinedValue.execute(state);
        if (dvstate.error || Object.keys(dvstate.syntaxErrors).length) {
            return dvstate;
        }
        const alt = dvstate.cst.children[0];
        if (alt.type === ProductionType.valuereference) {
            const text = state.text.slice(
                alt.location.startIndex,
                alt.location.endIndex,
            );
            if (builtinRootArcNamesToNumber.has(text)) {
                dvstate.error = true;
                return dvstate;
            }
        }
        return dvstate;
    }
);

export default ObjectIdentifierValuePrefix;
