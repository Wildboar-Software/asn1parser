import type ChoiceType from '../constructs/Types/ChoiceType.mjs';
import type Module from '../constructs/Module.mjs';
import TypeType from '../constructs/TypeType.mjs';
import TaggingMode from '../constructs/TaggingMode.mjs';
import { type Type } from '../constructs/Type.mjs';
import typeToTagNumberMap from '../maps/typeToTagNumberMap.mjs';
import type NamedType from '../constructs/NamedType.mjs';
import applyTagsToSetOrSequence from './applyTagsToSetOrSequence.mjs';
import { type Assignment } from '../constructs/Assignment.mjs';
import type TypeAssignment from '../constructs/AssignmentTypes/TypeAssignment.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import recursivelyResolve from '../recursivelyResolve.mjs';

// TODO: I think you could make a more generic version: `applyTagToType()`
// The NamedType's identifier is not even used anywhere here...
function applyTagToNamedType(
  nt: NamedType,
  currentModule: Module,
  modulesInScope: Module[],
  automaticTaggingInEffect: boolean,
  recursionCounter: number = 0
): void {
  const t: Type = nt.type;
  switch (t.typeType) {
    case TypeType.ChoiceType: {
      // eslint-disable-next-line
      applyTagsToChoice(
        t.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        recursionCounter + 1
      );
      break;
    }
    case TypeType.SetType:
    case TypeType.SequenceType: {
      // eslint-disable-next-line
      applyTagsToSetOrSequence(
        t.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        recursionCounter + 1
      );
      break;
    }
    case TypeType.PrefixedType: {
      if (t.tagging && !t.tagging.tag.class_) {
        t.tagging.tag.class_ = 'CONTEXT';
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
          explicit: currentModule.taggingMode === TaggingMode.EXPLICIT,
          tag: {
            classNumber: tag,
            class_: 'UNIVERSAL',
          },
        };
      }
    }
  }
}

// TODO: Use the iterateOver...() iterator.
/**
 * @param type_
 * @param currentModule
 * @param modulesInScope
 * @param automaticTaggingInEffect
 * @param recursionCounter
 */
export default function applyTagsToChoice(
  type_: ChoiceType,
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
    type_.rootAlternativeTypeList.forEach((nt: NamedType): void => {
      const t: Type = nt.type;
      t.tagging = {
        explicit: t.typeType === TypeType.ChoiceType,
        tag: {
          classNumber: i++,
          class_: 'CONTEXT',
        },
      };
    });

    (type_.extensionAdditionAlternatives || []).forEach((ea): void => {
      if ('alternativeTypeList' in ea) {
        ea.alternativeTypeList.forEach((ea2): void => {
          const t: Type = ea2.type;
          t.tagging = {
            explicit: t.typeType === TypeType.ChoiceType,
            tag: {
              classNumber: i++,
              class_: 'CONTEXT',
            },
          };
        });
      } else {
        const t: Type = ea.type;
        t.tagging = {
          explicit: t.typeType === TypeType.ChoiceType,
          tag: {
            classNumber: i++,
            class_: 'CONTEXT',
          },
        };
      }
    });
  } else {
    type_.rootAlternativeTypeList.forEach((nt: NamedType): void =>
      applyTagToNamedType(
        nt,
        currentModule,
        modulesInScope,
        automaticTaggingInEffect,
        0
      )
    );
    (type_.extensionAdditionAlternatives || []).forEach((ea): void => {
      if ('alternativeTypeList' in ea) {
        ea.alternativeTypeList.forEach((nt: NamedType): void =>
          applyTagToNamedType(
            nt,
            currentModule,
            modulesInScope,
            automaticTaggingInEffect,
            0
          )
        );
      } else {
        applyTagToNamedType(
          ea,
          currentModule,
          modulesInScope,
          automaticTaggingInEffect,
          0
        );
      }
    });
  }
}
