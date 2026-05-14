import TaggingMode from '../constructs/TaggingMode.mjs';
import { type NameAndOrNumber } from './NameAndOrNumber.mjs';
import { type Assignment } from './Assignment.mjs';
import type SymbolsFromModule from './SymbolsFromModule.mjs';

/**
 * `ModuleDefinition ::=
 *     ModuleIdentifier
 *     DEFINITIONS
 *     EncodingReferenceDefault
 *     TagDefault
 *     ExtensionDefault
 *     "::="
 *     BEGIN
 *     ModuleBody
 *     EncodingControlSections
 *     END`
 */
export default class Module {
  // eslint-disable-next-line max-params
  constructor(
    readonly name: string,
    readonly oid: NameAndOrNumber[] | undefined,
    readonly iri: string | undefined,
    readonly encodingReference: string | undefined,
    readonly taggingMode: TaggingMode, // EXPLICIT is the default.
    readonly extensibilityImplied: boolean, // Defaults to false.
    readonly imports: { [moduleName: string]: SymbolsFromModule },
    readonly exports: { [symbolName: string]: any } | undefined,
    readonly assignments: { [identifier: string]: Assignment },
    readonly asn1FilePath: string | undefined,
    readonly comment: string | undefined,
    readonly definedEnumItems: Set<string>
  ) {}
}
