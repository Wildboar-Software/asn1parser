import type SetOrSequenceType from '../constructs/Types/SetOrSequenceType.js';
import type Module from '../constructs/Module.js';
import TypeType from '../constructs/TypeType.js';
import { type ComponentType } from '../constructs/ComponentType.js';
import TaggingMode from '../constructs/TaggingMode.js';
import { type Type } from '../constructs/Type.js';
import typeToTagNumberMap from '../maps/typeToTagNumberMap.js';
import applyTagsToChoice from './applyTagsToChoice.js';
import { ASN1UniversalType } from "asn1-ts";
import recursivelyResolve from '../recursivelyResolve.js';
import { type Assignment } from '../constructs/Assignment.js';
import AssignmentType from '../constructs/AssignmentType.js';
import type TypeAssignment from '../constructs/AssignmentTypes/TypeAssignment.js';

// FIXME: I think you could make a more generic version: `applyTagToType()`
// The NamedType's identifier is not even used anywhere here...
function applyTagToComponentType(
  ct: ComponentType,
  currentModule: Module,
  modulesInScope: Module[],
  automaticTaggingInEffect: boolean,
  recursionCounter: number = 0
): void {
  if ('componentsOf' in ct) {
    return;
  }
  const t: Type = ct.namedType.type;
  switch (t.typeType) {
    case TypeType.ChoiceType: {
      applyTagsToChoice(
        t.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        recursionCounter + 1
      );
      break;
    }
    case TypeType.SetType: {
      // eslint-disable-next-line
      applyTagsToSetOrSequence(
        t.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        recursionCounter + 1
      );
      t.tagging = {
        explicit: false,
        tag: {
          classNumber: ASN1UniversalType.set,
          class_: 'UNIVERSAL',
        },
      };
      break;
    }
    case TypeType.SequenceType: {
      // eslint-disable-next-line
      applyTagsToSetOrSequence(
        t.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        recursionCounter + 1
      );
      t.tagging = {
        explicit: false,
        tag: {
          classNumber: ASN1UniversalType.sequence,
          class_: 'UNIVERSAL',
        },
      };
      break;
    }
    case TypeType.PrefixedType: {
      if (t.tagging && !t.tagging.tag.class_) {
        t.tagging.tag.class_ = 'CONTEXT';
      }
      if (t.tagging && t.tagging.explicit === undefined) {
        t.tagging.explicit = currentModule.taggingMode === TaggingMode.EXPLICIT;
      }
      break;
    }
    case TypeType.DefinedType: {
      const a: Assignment | undefined = recursivelyResolve(
        t.type,
        currentModule,
        modulesInScope
      );
      if (!a || a.assignmentType !== AssignmentType.TypeAssignment) {
        break;
      }
      const ta: TypeAssignment = a;
      const tag = typeToTagNumberMap.get(ta.type.typeType);
      if (tag) {
        t.tagging = {
          /**
           * We always set the encoding of a UNIVERSAL tag to `undefined`,
           * because, if the compiler forgets to ignore the tagging mode
           * when encoding a UNIVERSAL tag, it will still produce the
           * correct encoding.
           */
          explicit: undefined,
          tag: {
            classNumber: tag,
            class_: 'UNIVERSAL',
          },
        };
      } else if (
        ta.type.typeType === TypeType.PrefixedType &&
        ta.type.tagging
      ) {
        t.tagging = structuredClone(ta.type.tagging);
      }
      break;
    }
    default: {
      const tag = typeToTagNumberMap.get(t.typeType);
      if (tag) {
        t.tagging = {
          /**
           * We always set the encoding of a UNIVERSAL tag to `undefined`,
           * because, if the compiler forgets to ignore the tagging mode
           * when encoding a UNIVERSAL tag, it will still produce the
           * correct encoding.
           */
          explicit: undefined,
          tag: {
            classNumber: tag,
            class_: 'UNIVERSAL',
          },
        };
      }
    }
  }
}

// FIXME: Use the iterateOver...() iterator.
/**
 * According to X.680, the decision of whether to auto tag must be made before
 * expansion of COMPONENT OF, but actual tagging must be done after.
 *
 * @param type_
 * @param currentModule
 * @param modulesInScope
 * @param automaticTaggingInEffect
 * @param recursionCounter
 */
export default function applyTagsToSetOrSequence(
  type_: SetOrSequenceType,
  currentModule: Module,
  modulesInScope: Module[],
  automaticTaggingInEffect: boolean,
  recursionCounter: number = 0
): void {
  if (recursionCounter > 20) {
    throw new Error(
      `Recursion in applying tags exceeded because of module ${currentModule.name}.`
    );
  }
  if (automaticTaggingInEffect) {
    // NOTE: RCTLs are tagged before extensions.
    let i: number = 0;
    (type_.rootComponentTypeList1 || [])
      .concat(type_.rootComponentTypeList2 || [])
      .forEach((ct: ComponentType): void => {
        if ('componentsOf' in ct) {
          return;
        }
        const t: Type = ct.namedType.type;
        t.tagging = {
          explicit:
            t.typeType === TypeType.ChoiceType ||
            t.typeType === TypeType.ObjectClassFieldType,
          tag: {
            classNumber: i++,
            class_: 'CONTEXT',
          },
        };
      });

    (type_.extensionAdditionList || []).forEach((ea): void => {
      if ('componentsOf' in ea) {
        return;
      }
      if ('componentTypeList' in ea) {
        ea.componentTypeList.forEach((ct: ComponentType): void => {
          if ('componentsOf' in ct) {
            return;
          }
          const t: Type = ct.namedType.type;
          t.tagging = {
            explicit:
              t.typeType === TypeType.ChoiceType ||
              t.typeType === TypeType.ObjectClassFieldType,
            tag: {
              classNumber: i++,
              class_: 'CONTEXT',
            },
          };
        });
      } else {
        const t: Type = ea.namedType.type;
        t.tagging = {
          explicit:
            t.typeType === TypeType.ChoiceType ||
            t.typeType === TypeType.ObjectClassFieldType,
          tag: {
            classNumber: i++,
            class_: 'CONTEXT',
          },
        };
      }
    });

    // NOTE: The components that come from an expansion of a COMPONENTS OF
    //       should be tagged EXPLICIT or IMPLICIT according to their type.
    //       I don't know how I am going to make that work...
  } else {
    (type_.rootComponentTypeList1 || [])
      .concat(type_.rootComponentTypeList2 || [])
      .forEach((ct: ComponentType): void =>
        applyTagToComponentType(
          ct,
          currentModule,
          modulesInScope,
          automaticTaggingInEffect,
          recursionCounter + 1
        )
      );

    (type_.extensionAdditionList || []).forEach((ea): void => {
      if ('componentTypeList' in ea) {
        ea.componentTypeList.forEach((ct: ComponentType): void =>
          applyTagToComponentType(
            ct,
            currentModule,
            modulesInScope,
            automaticTaggingInEffect,
            recursionCounter + 1
          )
        );
        return;
      } else {
        applyTagToComponentType(
          ea,
          currentModule,
          modulesInScope,
          automaticTaggingInEffect,
          recursionCounter + 1
        );
      }
    });
  }
}
