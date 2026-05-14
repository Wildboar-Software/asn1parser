import type Module from './constructs/Module.js';
import type ChoiceType from './constructs/Types/ChoiceType.js';
import TaggingMode from './constructs/TaggingMode.js';
import TypeType from './constructs/TypeType.js';
import type NamedType from './constructs/NamedType.js';

/**
 * @summary Determines if `AUTOMATIC` tagging applies to a `CHOICE` type.
 * @param {ChoiceType} type_ The type whose tagging is to be determined.
 * @param {Module} currentModule The current module, whose default tagging rules
 *  determine (in part) whether this type will use `AUTOMATIC` tagging.
 * @returns {boolean} Indicates whether `AUTOMATIC` tagging is in effect.
 */
export default function automaticTaggingInEffectForChoice(
  type_: ChoiceType,
  currentModule: Module
): boolean {
  return (
    currentModule.taggingMode === TaggingMode.AUTOMATIC &&
    // If there is a single PrefixedType, ignore AUTOMATIC TAGS.
    !type_.rootAlternativeTypeList.some(
      (rat: NamedType): boolean => rat.type.typeType === TypeType.PrefixedType
    )
    /**
     * The extensions do not have to be checked for tags, because ASN.1
     * prohibits them from being tagged if automatic tagging is in place and
     * there are no tagged root components, per ITU X.680, Section 29.4.
     * The rationale for this is that the introduction of a new extension
     * could change whether the entire constructed type is automatically
     * tagged.
     */
  );
}
