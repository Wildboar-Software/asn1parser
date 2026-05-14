import { type Type } from '../constructs/Type.mjs';
import TypeType from '../constructs/TypeType.mjs';
import { type ComponentType } from '../constructs/ComponentType.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import type Defined from '../constructs/Defined.mjs';
import type NamedType from '../constructs/NamedType.mjs';
import type Module from '../constructs/Module.mjs';
import type Parameter from '../constructs/Parameter.mjs';
import convertParameterToActualParameter from './convertParameterToActualParameter.mjs';
import normalizeTypeAssignment from './Assignment/TypeAssignment.mjs';
import normalizeObjectAssignment from './Assignment/ObjectAssignment.mjs';
import type TypeAssignment from '../constructs/AssignmentTypes/TypeAssignment.mjs';
import type ObjectAssignment from '../constructs/AssignmentTypes/ObjectAssignment.mjs';
import type ObjectClassAssignment from '../constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import type ObjectSetAssignment from '../constructs/AssignmentTypes/ObjectSetAssignment.mjs';
import { type Object_ } from '../constructs/AssignmentTypes/ObjectAssignment/Object.mjs';
import FieldSpecType from '../constructs/FieldSpecType.mjs';

/**
 * @summary Unnest a `BIT STRING` type with a named bit list
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestBitStringType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (type_.typeType !== TypeType.BitStringType) {
    throw new Error(
      `Call to ${unnestBitStringType.name}() using type ${type_.typeType}.`
    );
  }
  if (!type_.type.namedBitList) {
    return;
  }

  /**
   * We only unnest if the path length is greater than one. If we did not,
   * root-level constructed types would attempt to unnest themselves!
   */
  if (path.length <= 1) {
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'BIT STRING { -- REMOVED_FROM_UNNESTING -- }',
    type: structuredClone(type_),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (type_ as Type).typeType = TypeType.DefinedType;
  (type_ as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  };
  delete type_.type.namedBitList;
  delete type_.type.selfContained;
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest an `INTEGER` type with a named number list
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestIntegerType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (type_.typeType !== TypeType.IntegerType) {
    throw new Error(
      `Call to ${unnestIntegerType.name}() using type ${type_.typeType}.`
    );
  }
  if (!type_.type.namedNumberList) {
    return;
  }

  /**
   * We only unnest if the path length is greater than one. If we did not,
   * root-level constructed types would attempt to unnest themselves!
   */
  if (path.length <= 1) {
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'INTEGER { -- REMOVED_FROM_UNNESTING -- }',
    type: structuredClone(type_),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (type_ as Type).typeType = TypeType.DefinedType;
  (type_ as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  } as Defined;
  delete type_.type.namedNumberList;
  delete type_.type.selfContained;
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest an `ENUMERATED` type
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestEnumeratedType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (type_.typeType !== TypeType.EnumeratedType) {
    throw new Error(
      `Call to ${unnestEnumeratedType.name}() using type ${type_.typeType}.`
    );
  }

  /**
   * We only unnest if the path length is greater than one. If we did not,
   * root-level constructed types would attempt to unnest themselves!
   */
  if (path.length <= 1) {
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'ENUMERATED { -- REMOVED_FROM_UNNESTING -- }',
    type: structuredClone(type_),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (type_ as Type).typeType = TypeType.DefinedType;
  (type_ as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  } as Defined;
  delete type_.type.allItemsExplicitlyNumbered;
  delete type_.type.exception;
  delete type_.type.explicitlyExtensible;
  delete type_.type.items;
  delete type_.type.selfContained;
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest a `SET` or `SEQUENCE` type
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestSetOrSequenceType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (
    type_.typeType !== TypeType.SetType &&
    type_.typeType !== TypeType.SequenceType
  ) {
    throw new Error(
      `Call to unnestSetOrSequenceType() using type ${type_.typeType}.`
    );
  }
  (type_.type.rootComponentTypeList1 || [])
    .concat(type_.type.rootComponentTypeList2 || [])
    .forEach((ct: ComponentType): void => {
      if ('componentsOf' in ct) {
        return;
      }
      // eslint-disable-next-line
      unnestType(
        ct.namedType.type,
        currentModule,
        modulesInScope,
        path.concat([ct.namedType.identifier]),
        parameters
      );
    });

  (type_.type.extensionAdditionList || []).forEach((ea): void => {
    if ('componentsOf' in ea) {
      return;
    }
    if ('componentTypeList' in ea) {
      ea.componentTypeList.forEach((ct: ComponentType): void => {
        if ('componentsOf' in ct) {
          return;
        }
        // eslint-disable-next-line
        unnestType(
          ct.namedType.type,
          currentModule,
          modulesInScope,
          path.concat([ct.namedType.identifier]),
          parameters
        );
      });
    } else {
      // eslint-disable-next-line
      unnestType(
        ea.namedType.type,
        currentModule,
        modulesInScope,
        path.concat([ea.namedType.identifier]),
        parameters
      );
    }
  });

  /**
   * We only unnest if the path length is greater than one. If we did not,
   * root-level constructed types would attempt to unnest themselves!
   */
  if (path.length <= 1) {
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'SEQUENCE { -- REMOVED_FROM_UNNESTING -- }',
    type: structuredClone(type_),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (type_ as Type).typeType = TypeType.DefinedType;
  (type_ as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  } as Defined;
  delete type_.type.rootComponentTypeList1;
  delete type_.type.rootComponentTypeList2;
  delete type_.type.extensionAdditionList;
  delete type_.type.explicitlyExtensible;
  delete type_.type.exception;
  delete type_.type.hasSelfContainedRootComponentTypeList;
  delete type_.type.hasOptionalRootComponentTypes;
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest a `CHOICE` type
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestChoiceType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (type_.typeType !== TypeType.ChoiceType) {
    throw new Error(`Call to unnestChoiceType() using type ${type_.typeType}.`);
  }
  type_.type.rootAlternativeTypeList.forEach((nt: NamedType): void => {
    // eslint-disable-next-line
    unnestType(
      nt.type,
      currentModule,
      modulesInScope,
      path.concat([nt.identifier]),
      parameters
    );
  });

  (type_.type.extensionAdditionAlternatives || []).forEach((eat): void => {
    if ('alternativeTypeList' in eat) {
      eat.alternativeTypeList.forEach((nt: NamedType): void => {
        // eslint-disable-next-line
        unnestType(
          nt.type,
          currentModule,
          modulesInScope,
          path.concat([nt.identifier]),
          parameters
        );
      });
    } else {
      // eslint-disable-next-line
      unnestType(
        eat.type,
        currentModule,
        modulesInScope,
        path.concat([eat.identifier]),
        parameters
      );
    }
  });

  /**
   * We only unnest if the path length is greater than one. If we did not,
   * root-level constructed types would attempt to unnest themselves!
   */
  if (path.length <= 1) {
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'CHOICE { -- REMOVED_FROM_UNNESTING -- }',
    type: structuredClone(type_),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (type_ as Type).typeType = TypeType.DefinedType;
  (type_ as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  } as Defined;
  delete (type_.type as {rootAlternativeTypeList?: any}).rootAlternativeTypeList;
  delete type_.type.explicitlyExtensible;
  delete type_.type.exception;
  delete type_.type.extensionAdditionAlternatives;
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest a `SET OF` or `SEQUENCE OF` type
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
function unnestSetOrSequenceOfType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (
    type_.typeType !== TypeType.SetOfType &&
    type_.typeType !== TypeType.SequenceOfType
  ) {
    throw new Error(
      `Call to unnestSetOrSequenceOfType() using type ${type_.typeType}.`
    );
  }
  const t = 'identifier' in type_.type.of ? type_.type.of.type : type_.type.of;
  path = path.concat([
    'identifier' in type_.type.of ? type_.type.of.identifier : 'Item',
  ]);
  // eslint-disable-next-line
  unnestType(t, currentModule, modulesInScope, path, parameters);
  if (
    t.typeType !== TypeType.SetType &&
    t.typeType !== TypeType.SequenceType &&
    t.typeType !== TypeType.ChoiceType
  ) {
    // If it is not one of these, we do not have to unnest it.
    return;
  }
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (param) => param.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: TypeAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.TypeAssignment,
    leftHandSide: newPath,
    rightHandSide: 'ANY -- REMOVED_FROM_UNNESTING --',
    type: structuredClone(t),
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
  };
  currentModule.assignments[newPath] = newAssignment;
  (t as Type).typeType = TypeType.DefinedType;
  (t as Type).type = {
    reference: newPath,
    parameters: typeParams?.map((param) =>
      convertParameterToActualParameter(param, currentModule)
    ),
    assignmentType: AssignmentType.TypeAssignment,
    computedModule: currentModule.name,
  } as Defined;
  // REVIEW: Aren't there extra properties here?
  normalizeTypeAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest a type
 * @param {Type} type_ The type to be simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
export default function unnestType(
  type_: Type,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (path.length > 20) {
    throw new Error(
      `Unnesting exceeded recursion limits. Path started with '${path[0]}'.`
    );
  }
  switch (type_.typeType) {
    case TypeType.BitStringType: {
      unnestBitStringType(
        type_,
        currentModule,
        modulesInScope,
        path,
        parameters
      );
      break;
    }
    case TypeType.EnumeratedType: {
      unnestEnumeratedType(
        type_,
        currentModule,
        modulesInScope,
        path,
        parameters
      );
      break;
    }
    case TypeType.IntegerType: {
      unnestIntegerType(type_, currentModule, modulesInScope, path, parameters);
      break;
    }
    case TypeType.SetType:
    case TypeType.SequenceType: {
      unnestSetOrSequenceType(
        type_,
        currentModule,
        modulesInScope,
        path,
        parameters
      );
      break;
    }
    case TypeType.ChoiceType: {
      unnestChoiceType(type_, currentModule, modulesInScope, path, parameters);
      break;
    }
    case TypeType.SetOfType:
    case TypeType.SequenceOfType: {
      unnestSetOrSequenceOfType(
        type_,
        currentModule,
        modulesInScope,
        path,
        parameters
      );
      break;
    }
    // Commented out because this should never really contain anything other
    // than a DefinedType, ObjectClassFieldType, or TypeFromObjects.
    // It is pointless for it to reference a hard-coded CHOICE or PrefixedType.
    // case (TypeType.SelectionType): {
    //     unnest(
    //         type_.type.type,
    //         currentModule,
    //         path.concat([ type_.type.identifier ]),
    //     );
    //     break;
    // }
    case TypeType.PrefixedType: {
      unnestType(
        type_.type,
        currentModule,
        modulesInScope,
        path
        // FIXME: I think this needs parameters
      );
      break;
    }
    default: {
      break;
    }
  }
}

// Object ::=
//     DefinedObject
//     | ObjectDefn
//     | ObjectFromObject
//     | ParameterizedObject

/**
 * @summary Unnest an object
 * @param {Object_} obj The information object to be simplified by unnesting.
 * @param {ObjectClassAssignment} oca The information object class of which
 *  `obj` is a member.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
export function unnestObject( // eslint-disable-line
  obj: Object_,
  oca: ObjectClassAssignment,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  if (
    'reference' in obj ||
    'referencedObjects' in obj ||
    Array.isArray(obj) ||
    !('fieldSpecs' in oca.objectClass)
  ) {
    return;
  }
  const specs = oca.objectClass.fieldSpecs;
  Object.entries(obj.fieldSettings).forEach(([name, setting]) => {
    const spec = specs[name];
    switch (spec.specType) {
      case FieldSpecType.ObjectFieldSpec: {
        // The setting is an ObjectDefn.
        if (
          'object' in setting &&
          ('fieldSettings' in setting.object || Array.isArray(setting.object))
        ) {
          const newPath: string = [...path, name.replace('&', '')].join('-');
          if (newPath in currentModule.assignments) {
            return; // Completely abort unnesting so we don't wreck something.
          }
          const typeParams = parameters?.filter(
            (p) => p.assignmentType === AssignmentType.TypeAssignment
          );
          const newAssignment: ObjectAssignment = {
            identifier: newPath,
            assignmentType: AssignmentType.ObjectAssignment,
            leftHandSide: newPath,
            rightHandSide: '{} -- REMOVED_FROM_UNNESTING --',
            unnestedFrom: {
              module: currentModule.name,
              reference: path.slice(0, -1).join('-'),
              computedModule: currentModule.name,
            },
            parameters: structuredClone(typeParams),
            dependencies: {},
            definedObjectClass: spec.definedObjectClass,
            object: structuredClone(setting.object),
          };
          currentModule.assignments[newPath] = newAssignment;

          obj.fieldSettings[name] = {
            object: {
              reference: newPath,
              parameters: typeParams?.map((p) =>
                convertParameterToActualParameter(p, currentModule)
              ),
              assignmentType: AssignmentType.ObjectAssignment,
              computedModule: currentModule.name,
            },
          };
          normalizeObjectAssignment(
            newAssignment,
            currentModule,
            modulesInScope
          );
        }
        break;
      }
      case FieldSpecType.TypeFieldSpec: {
        if ('type' in setting) {
          unnestType(
            setting.type,
            currentModule,
            modulesInScope,
            [...path, name.replace('&', '')],
            parameters
          );
        }
        break;
      }
      default: {
        break;
      }
    }
  });
}

// ObjectSetElements ::=
//     Object
//     | DefinedObjectSet
//     | ObjectSetFromObjects
//     | ParameterizedObjectSet

// Object ::=
//     DefinedObject
//     | ObjectDefn
//     | ObjectFromObject
//     | ParameterizedObject

// This is what this unnests:
// ObjectDefn ::=
//     DefaultSyntax
//     | DefinedSyntax

// type ObjectSetElements = (Object_ | Defined | SomethingFromObject);
// export default ObjectSetElements;

/**
 * @summary Unnest an information object from an information object set
 * @param {Object_} obj The information object to be simplified by unnesting.
 * @param {Defined} definedObjectClass A reference to the information object
 *  class of which `obj` is a member.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
export function unnestObjectFromObjectSet( // eslint-disable-line
  obj: Object_,
  definedObjectClass: Defined,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
  parameters?: Parameter[]
): void {
  const newPath: string = path.join('-');
  if (newPath in currentModule.assignments) {
    return; // Completely abort unnesting so we don't wreck something.
  }
  const typeParams = parameters?.filter(
    (p) => p.assignmentType === AssignmentType.TypeAssignment
  );
  const newAssignment: ObjectAssignment = {
    identifier: newPath,
    assignmentType: AssignmentType.ObjectAssignment,
    leftHandSide: newPath,
    rightHandSide: '{} -- REMOVED_FROM_UNNESTING --',
    unnestedFrom: {
      module: currentModule.name,
      reference: path.slice(0, -1).join('-'),
      computedModule: currentModule.name,
    },
    parameters: structuredClone(typeParams),
    dependencies: {},
    definedObjectClass,
    object: obj,
  };
  currentModule.assignments[newPath] = newAssignment;
  normalizeObjectAssignment(newAssignment, currentModule, modulesInScope);
}

/**
 * @summary Unnest an information object from an information object set
 * @param {ObjectSetAssignment} osa The information object set assignment to be
 *  simplified by unnesting.
 * @param {Module} currentModule The current ASN.1 module.
 * @param {Module[]} modulesInScope All ASN.1 modules in scope.
 * @param {string} path The path of the thing to be unnested.
 * @param {Parameter[] | undefined} parameters The parameters of the assignment.
 * @function
 */
export function unnestObjectSetAssignment(
  osa: ObjectSetAssignment,
  currentModule: Module,
  modulesInScope: Module[],
  path: string[], // This can be used as a recursion counter.
): void {
  const ress = osa.objectSetSpec.rootElementSetSpec;
  const aess = osa.objectSetSpec.additionalElementSetSpec;
  const sets = [];
  if (ress) {
    sets.push(ress);
  }
  if (aess) {
    sets.push(aess);
  }
  sets.forEach((ess) => {
    if (ess && !('allExcept' in ess)) {
      ess.unions.forEach((union, unionIndex) =>
        union.intersections.forEach((intersection, intersectionIndex) => {
          if (
            Array.isArray(intersection.elements) ||
            'fieldSettings' in intersection.elements
          ) {
            // DefinedSyntax or DefaultSyntax
            const obj = intersection.elements;
            const newPath: string[] = [
              ...path,
              `Union${unionIndex}`,
              `Intersection${intersectionIndex}`,
              'Element',
            ];
            unnestObjectFromObjectSet(
              obj,
              osa.definedObjectClass,
              currentModule,
              modulesInScope,
              newPath,
              osa.parameters
            );
            intersection.elements = {
              computedModule: currentModule.name,
              reference: newPath.join('-'),
              assignmentType: AssignmentType.ObjectAssignment,
            };
          }

          if (
            intersection.exclusions && // DefinedSyntax or DefaultSyntax
            (Array.isArray(intersection.exclusions) ||
              'fieldSettings' in intersection.exclusions)
          ) {
            const obj = intersection.exclusions;
            const newPath: string[] = [
              ...path,
              `Union${unionIndex}`,
              `Intersection${intersectionIndex}`,
              'Exclusion',
            ];
            unnestObjectFromObjectSet(
              obj,
              osa.definedObjectClass,
              currentModule,
              modulesInScope,
              newPath,
              osa.parameters
            );
            intersection.exclusions = {
              computedModule: currentModule.name,
              reference: newPath.join('-'),
              assignmentType: AssignmentType.ObjectAssignment,
            };
          }
        })
      );
    }
  });
}
