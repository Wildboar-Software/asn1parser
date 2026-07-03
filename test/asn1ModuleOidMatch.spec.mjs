import { describe, it } from 'node:test';
import * as assert from "node:assert/strict";
import { asn1ModuleOidMatch } from "../dist/lib/asn1ModuleOidMatch.mjs";
import { SelectionOption } from '../dist/lib/constructs/SelectionOption.mjs';

describe(asn1ModuleOidMatch.name, () => {
    it("matches two modules with identical object identifiers", () => {
        const modoid = [ 1, 2, 3, 4 ];
        const impoid = [ 1, 2, 3, 4 ];
        assert.strict(asn1ModuleOidMatch(modoid, impoid));
    });

    it("does not match if two modules differ in object identifiers with no selection option", () => {
        const modoid = [ 1, 2, 3, 4 ];
        const impoid = [ 1, 2, 3, 5 ];
        assert.strict(!asn1ModuleOidMatch(modoid, impoid));
    });

    it("matches successors", () => {
        const modoid = [ 1, 2, 3, 4 ];
        const impoid = [ 1, 2, 3, 4 ];
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_SUCCESSORS));

        modoid[3] += 1;
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_SUCCESSORS));

        modoid[3] += 1;
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_SUCCESSORS));

        impoid[3] += 3;
        assert.strict(!asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_SUCCESSORS));
    });
    
    it("matches descendants", () => {
        const modoid = [ 1, 2, 3, 4 ];
        const impoid = [ 1, 2, 3, 4 ];
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));

        modoid[3] += 1;
        assert.strict(!asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));

        impoid[3] += 1;
        // The two OIDs should be equal at this point.
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));
        
        impoid.push(5);
        assert.strict(!asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));

        modoid.push(5);
        // The two OIDs should be equal at this point.
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));

        modoid.push(6);
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));

        modoid.push(7);
        assert.strict(asn1ModuleOidMatch(modoid, impoid, SelectionOption.WITH_DESCENDANTS));
    });
});
