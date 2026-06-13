import TaggingMode from '../constructs/TaggingMode.mjs';
import { type NameAndOrNumber } from './NameAndOrNumber.mjs';
import { type Assignment } from './Assignment.mjs';
import type { Exports } from './Exports.mjs';
import type { Imports } from './Imports.mjs';
import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Production from '../Production.mjs';
import type ProductionType from '../ProductionType.mjs';

/**
 * ASN.1 module
 * 
 * ```bnf
 * ModuleDefinition ::=
 *     ModuleIdentifier
 *     DEFINITIONS
 *     EncodingReferenceDefault
 *     TagDefault
 *     ExtensionDefault
 *     "::="
 *     BEGIN
 *     ModuleBody
 *     EncodingControlSections
 *     END
 * ```
 */
export default class Module implements GrokedThing {

  /**
   * The CST node corresponding to this ASN.1 module.
   */
  public production?: Production<ProductionType> | undefined;

  /**
   * The production type.
   */
  public productionType?: ProductionType | undefined;

  /**
   * CST nodes of the duplicate assignments.
   */
  public duplicateAssignments: Production[] = [];

  // eslint-disable-next-line max-params
  constructor(
    /**
     * Name of the ASN.1 module
     */
    readonly name: string,

    /**
     * Object identifier that identifies this ASN.1 module
     */
    readonly oid: NameAndOrNumber[] | undefined,

    /**
     * International Resource Identifier (IRI) that identifies this ASN.1 module
     */
    readonly iri: string | undefined,

    readonly encodingReference: string | undefined,

    /**
     * The tagging mode of this module. `EXPLICIT` is the default.
     */
    readonly taggingMode: TaggingMode,

    /**
     * Whether extensibility is implied for the ASN.1 module. Defaults to 
     * false.
     */
    readonly extensibilityImplied: boolean,
    
    /**
     * Imported symbols from other ASN.1 modules.
     */
    readonly imports: Imports,

    /**
     * Symbols explicitly exported from this ASN.1 module, or
     * `undefined` if all of them are.
     */
    readonly exports: Exports | undefined,

    /**
     * Identifiers assigned to types, values, information objects, information
     * object classes, information object sets, and value sets. These are
     * indexed by the identifier.
     */
    readonly assignments: { [identifier: string]: Assignment },

    /**
     * Path to the file from whence this module was parsed.
     */
    readonly asn1FilePath: string | undefined,

    /**
     * Comment that appeared above this ASN.1 module.
     */
    readonly comment: string | undefined,

    /**
     * `ENUMERATED` variant identifiers that were defined. This is simply to aid
     * in parsing and groking.
     */
    readonly definedEnumItems: Set<string>,
  ) {}
}
