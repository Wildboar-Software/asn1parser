import { type Assignment } from '../constructs/Assignment.js';
import type SetOrSequenceType from '../constructs/Types/SetOrSequenceType.js';
import type Module from '../constructs/Module.js';
import TypeType from '../constructs/TypeType.js';
import { type ComponentType } from '../constructs/ComponentType.js';
import automaticTaggingInEffectForSetOrSequence from '../automaticTaggingInEffectForSetOrSequence.js';
import applyTagsToSetOrSequence from './applyTagsToSetOrSequence.js';
import _ from 'lodash';
import AssignmentType from '../constructs/AssignmentType.js';
import recursivelyResolve from '../recursivelyResolve.js';

/**
 * @summary Replace `COMPONENTS OF` components with the components to which they
 *  refer
 * @description
 * This function copies the components of a `SET` or `SEQUENCE` referenced by
 * `COMPONENTS OF` into the component type list that uses the clause, thereby
 * replacing `COMPONENTS OF` components with the actual components to which
 * they refer.
 *
 * Note that X.680 states that only the `RootComponentTypeList` elements from
 * the referent `COMPONENTS OF` `SET` or `SEQUENCE` get replicated.
 *
 * @param {ComponentType[]} list The list to which replicated components shall
 *  be inserted.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {number} recursionCount The depth of the current recursion.
 * @function
 */
function replicateComponentsOfIntoComponentTypeList(
  list: ComponentType[],
  currentModule: Module,
  modulesInScope: Module[],
  recursionCounter: number
): void {
  for (let i: number = 0; i < list.length; i++) {
    const c = list[i];
    if (!('componentsOf' in c)) {
      continue;
    }
    switch (c.componentsOf.typeType) {
      case TypeType.DefinedType: {
        const a: Assignment | undefined = recursivelyResolve(
          c.componentsOf.type,
          currentModule,
          modulesInScope
        );
        if (!a) {
          continue;
        }
        if (a.assignmentType !== AssignmentType.TypeAssignment) {
          throw new Error(
            `COMPONENTS OF was used to replicate non-type '${c.componentsOf.type.reference}'.`
          );
        }
        // TODO: Support replicating components from tagged types, defined types, etc.
        // ^ I think this could be done best with a simple getComponents() function.
        if (
          a.type.typeType !== TypeType.SequenceType &&
          a.type.typeType !== TypeType.SetType
        ) {
          throw new Error(
            `COMPONENTS OF was used to replicate an incompatible type: ${a.type.typeType}.`
          );
        }
        const ss: SetOrSequenceType = a.type.type;
        if (!a.module) {
          throw new Error(`Type Assignment '${a.identifier}' had no module.`);
        }
        const referentModule: Module | undefined = modulesInScope.find(
          (mod: Module): boolean => mod.name === a.module?.name
        );
        if (!referentModule) {
          throw new Error(`Could not find module named '${a.module?.name}'.`);
        }
        const automaticTaggingInEffect: boolean =
          automaticTaggingInEffectForSetOrSequence(ss, referentModule);

        // eslint-disable-next-line
        replicateComponentsOf(
          ss,
          referentModule,
          modulesInScope,
          recursionCounter
        ); // Don't increment _here_.
        /**
         * We do this here because imported sequences must be tagged according
         * to the tagging mode in which they are defined, not according to the
         * tagging mode of the referring module.
         */
        applyTagsToSetOrSequence(
          ss,
          referentModule,
          modulesInScope,
          automaticTaggingInEffect,
          recursionCounter
        );
        // We deep-clone so modifications to the tags of a referrer do not modify the tags of the referent.
        const components: ComponentType[] = structuredClone(
          (ss.rootComponentTypeList1 || []).concat(
            ss.rootComponentTypeList2 || []
          )
        );
        components.forEach((c2: ComponentType): void => {
          c2.replicatedFromElsewhere = true;
        });
        list.splice(i, 1, ...components);
        break;
      }
      case TypeType.SetType:
      case TypeType.SequenceType: {
        const ss: SetOrSequenceType = c.componentsOf.type;
        // eslint-disable-next-line
        replicateComponentsOf(
          ss,
          currentModule,
          modulesInScope,
          recursionCounter
        ); // Don't increment _here_.
        // We deep-clone so modifications to the tags of a referrer do not modify the tags of the referent.
        const components: ComponentType[] = structuredClone(
          (ss.rootComponentTypeList1 || []).concat(
            ss.rootComponentTypeList2 || []
          )
        );
        components.forEach((c2: ComponentType): void => {
          c2.replicatedFromElsewhere = true;
        });
        list.splice(i, 1, ...components);
        break;
      }
      default: {
        continue;
      }
    }
  }
}

/**
 * @summary Replace a `COMPONENTS OF` component with the components to which it
 *  refers
 * @description
 * This function copies the components of a `SET` or `SEQUENCE` referenced by
 * `COMPONENTS OF` into a `SET` or `SEQUENCE` that uses the clause, thereby
 * replacing the `COMPONENTS OF` components with the actual components to which
 * they refer.
 *
 * Note that X.680 states that only the `RootComponentTypeList` elements from
 * the referent `COMPONENTS OF` `SET` or `SEQUENCE` get replicated.
 *
 * @param {SetOrSequenceType} type_ The `SET` or `SEQUENCE` whose root component
 *  type lists are to have `COMPONENTS OF` components replaced.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {number} recursionCount The depth of the current recursion.
 * @function
 */
export default function replicateComponentsOf(
  type_: SetOrSequenceType,
  currentModule: Module,
  modulesInScope: Module[],
  recursionCounter: number = 0
): void {
  if (recursionCounter > 5) {
    throw new Error(
      `Recursion in resolving COMPONENTS OF exceeded because of module ${currentModule.name}.`
    );
  }
  const rctl1 = type_.rootComponentTypeList1 || [];
  const rctl2 = type_.rootComponentTypeList2 || [];
  // TODO: What about extension additions?
  replicateComponentsOfIntoComponentTypeList(
    rctl1,
    currentModule,
    modulesInScope,
    recursionCounter + 1
  );
  replicateComponentsOfIntoComponentTypeList(
    rctl2,
    currentModule,
    modulesInScope,
    recursionCounter + 1
  );
}
