import type Module from '../../constructs/Module.mjs';
import type TypeAssignment from '../../constructs/AssignmentTypes/TypeAssignment.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import replicateComponentsOf from '../../normalizers/replicateComponentsOf.mjs';
import applyTagsToSetOrSequence from '../../normalizers/applyTagsToSetOrSequence.mjs';
import automaticTaggingInEffectForSetOrSequence from '../../automaticTaggingInEffectForSetOrSequence.mjs';
import identifyDependencies from '../../normalizers/identifyDependencies.mjs';
import applyTagsToChoice from '../../normalizers/applyTagsToChoice.mjs';
import automaticTaggingInEffectForChoice from '../../automaticTaggingInEffectForChoice.mjs';
import { type Type } from '../../constructs/Type.mjs';
import unnestType from '../../normalizers/unnest.mjs';
import getUnprefixedType from '../../getUnprefixedType.mjs';
import removeItemDependencies from '../removeItemDependencies.mjs';

export default function normalize(
  assignment: TypeAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  unnestType(
    assignment.type,
    currentModule,
    modulesInScope,
    [assignment.identifier],
    assignment.parameters
  );
  const innerType: Type = getUnprefixedType(assignment.type);
  switch (innerType.typeType) {
    case TypeType.SetType:
    case TypeType.SequenceType: {
      identifyDependencies(
        innerType,
        assignment,
        currentModule,
        modulesInScope,
        0
      );
      replicateComponentsOf(innerType.type, currentModule, modulesInScope, 0);
      applyTagsToSetOrSequence(
        innerType.type,
        currentModule,
        modulesInScope,
        /**
         * According to ITU X.680, the decision of whether to auto tag
         * must be made before expansion of COMPONENTS OF, but actual
         * tagging must be done after.
         */
        automaticTaggingInEffectForSetOrSequence(innerType.type, currentModule),
        0
      );
      break;
    }
    case TypeType.ChoiceType: {
      applyTagsToChoice(
        innerType.type,
        currentModule,
        modulesInScope,
        automaticTaggingInEffectForChoice(innerType.type, currentModule),
        0
      );
      break;
    }
    default: {
    } // eslint-disable-line
  }
  assignment.parameters?.forEach((param, index) => {
    if (
      typeof param.paramGovernor === 'object' &&
      'typeType' in param.paramGovernor &&
      param.paramGovernor.typeType !== TypeType.DefinedType
    ) {
      unnestType(param.paramGovernor, currentModule, modulesInScope, [
        assignment.identifier,
        `Parameter-${index}`,
      ]);
    }
  });
  identifyDependencies(
    assignment.parameters,
    assignment,
    currentModule,
    modulesInScope,
    0
  );
  identifyDependencies(innerType, assignment, currentModule, modulesInScope, 0);
  Object.values(assignment.dependencies).forEach((dep) =>
    removeItemDependencies(assignment, dep, currentModule, modulesInScope)
  );
}
