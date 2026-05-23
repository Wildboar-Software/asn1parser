/**
 * Tests using real-world ASN.1 modules
 */
import {
  lex,
  LogLevel,
  grok,
  ProductionType,
  normalize,
  parse,
  correct,
  AssignmentType,
  TypeType,
  Production, 
} from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { strict as assert, strictEqual as assertEqual, notStrictEqual } from 'node:assert';

// Copied from regression.spec.mjs
/**
 * Asserts that every CST node beneath (and including) this one does not have
 * an invalid location, meaning a negative start index, end index, line number,
 * or column number.
 * 
 * @param {import("../dist/index.mjs").Production} cst The concrete syntax tree
 */
function checkCSTForNegativeLocations(cst) {
  const loc = cst.location;
  notStrictEqual(loc.startIndex, -1, cst.type);
  notStrictEqual(loc.endIndex, -1, cst.type);
  notStrictEqual(loc.lineNumber, -1, cst.type);
  notStrictEqual(loc.columnNumber, -1, cst.type);
  for (const child of cst.children) {
    checkCSTForNegativeLocations(child);
  }
}

const ASN1_FILES = [
    "AlgorithmObjectIdentifiers.asn1",
    "AttributeCertificateDefinitions.asn1",
    "AttributeModule.asn1",
    "AuthenticationFramework.asn1",
    "BasicAccessControl.asn1",
    "CAP.asn1",
    "CMSProfileAttributes.asn1",
    "CertificateExtensions.asn1",
    "CommonProtocolSpecification.asn1",
    "DSAOperationalAttributeTypes.asn1",
    "DirectoryAbstractService.asn1",
    "DirectoryAccessProtocol.asn1",
    "DirectoryIDMProtocols.asn1",
    "DirectoryInformationShadowProtocol.asn1",
    "DirectoryManagement.asn1",
    "DirectoryOSIProtocols.asn1",
    "DirectoryOperationalBindingManagementProtocol.asn1",
    "DirectoryOperationalBindingTypes.asn1",
    "DirectorySecurityExchanges.asn1",
    "DirectoryShadowAbstractService.asn1",
    "DirectorySystemProtocol.asn1",
    "DistributedOperations.asn1",
    "EnhancedSecurity.asn1",
    "ExtensionAttributes.asn1",
    "GULS.asn1",
    "HierarchicalOperationalBindings.asn1",
    "IDMProtocolSpecification.asn1",
    "IN-SCF-SDF.asn1",
    "InformationFramework.asn1",
    "LdapSystemSchema.asn1",
    "MSMatchingRules.asn1",
    "MTAAbstractService.asn1",
    "OCSP.asn1",
    "OSIProtocolSpecification.asn1",
    "OperationalBindingManagement.asn1",
    "PKIX1Implicit93.asn1",
    "PasswordPolicy.asn1",
    "PkiPMIProtocolSpecifications.asn1",
    "PkiPmiExternalDataTypes.asn1",
    "PkiPmiWrapper.asn1",
    "ProtocolObjectIdentifiers.asn1",
    "SchemaAdministration.asn1",
    "SelectedAttributeTypes.asn1",
    "SelectedObjectClasses.asn1",
    "ServiceAdministration.asn1",
    "SpkmGssTokens.asn1",
    "UpperBounds.asn1",
    "UsefulDefinitions.asn1",
];

ASN1_FILES.forEach((asn1file) => {
    test('lexing, parsing, and groking works with ' + asn1file, () => {
        const asn1text = fs.readFileSync(
            path.join(
                __dirname,
                'data',
                'modules',
                asn1file
            ),
            { encoding: 'utf8' },
        );
        const lexicalTokens = Array.from(lex(asn1text));
        for (const token of lexicalTokens) {
            checkCSTForNegativeLocations(token);
        }
        const parseResults = parse(
            asn1text,
            lexicalTokens,
        );
        assertEqual(parseResults.error, undefined);
        const modules = grok(
            asn1text,
            parseResults
        );
        checkCSTForNegativeLocations(parseResults.cst);
    });
});
