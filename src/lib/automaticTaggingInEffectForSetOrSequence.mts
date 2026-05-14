import { type ComponentType } from './constructs/ComponentType.mjs';
import type Module from './constructs/Module.mjs';
import type SetOrSequenceType from './constructs/Types/SetOrSequenceType.mjs';
import TaggingMode from './constructs/TaggingMode.mjs';
import TypeType from './constructs/TypeType.mjs';

/**
 * @summary Determines if `AUTOMATIC` tagging applies to a `CHOICE` type.
 * @description
 * According to X.680, the decision of whether to auto tag
 * must be made before expansion of COMPONENT OF, but actual
 * tagging must be done after.
 *
 * @param {ChoiceType} type_ The type whose tagging is to be determined.
 * @param {Module} currentModule The current module, whose default tagging rules
 *  determine (in part) whether this type will use `AUTOMATIC` tagging.
 * @returns {boolean} Indicates whether `AUTOMATIC` tagging is in effect.
 * @see ITU X.680 2015, Section 25.3.
 */
export default function automaticTaggingInEffectForSetOrSequence(
  type_: SetOrSequenceType,
  currentModule: Module
): boolean {
  return (
    currentModule.taggingMode === TaggingMode.AUTOMATIC &&
    // If there is a single PrefixedType, ignore AUTOMATIC TAGS.
    (!type_.rootComponentTypeList1 ||
      !type_.rootComponentTypeList1.some(
        (rct: ComponentType): boolean =>
          'namedType' in rct &&
          rct.namedType.type.typeType === TypeType.PrefixedType
      )) &&
    (!type_.rootComponentTypeList2 ||
      !type_.rootComponentTypeList2.some(
        (rct: ComponentType): boolean =>
          'namedType' in rct &&
          rct.namedType.type.typeType === TypeType.PrefixedType
      ))
    /**
     * The extensions do not have to be checked for tags, because ASN.1
     * prohibits them from being tagged if automatic tagging is in place and
     * there are no tagged root components, per ITU X.680, Section 25.9.
     * The rationale for this is that the introduction of a new extension
     * could change whether the entire constructed type is automatically
     * tagged.
     */
  );
}
