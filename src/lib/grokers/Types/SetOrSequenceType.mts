import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import ProductionType from '../../ProductionType.js';
import TypeType from '../../constructs/TypeType.js';
import grokExceptionSpec from '../ExceptionSpec.js';
import { type ExceptionIdentification } from '../../constructs/ExceptionIdentification.js';
import { type ComponentType } from '../../constructs/ComponentType.js';
import grokComponentType from '../ComponentType.js';
import { type Type } from '../../constructs/Type.js';

// SequenceType ::=
//  SEQUENCE "{" "}"
// 	| SEQUENCE "{" ExtensionAndException OptionalExtensionMarker "}"
// 	| SEQUENCE "{" ComponentTypeLists "}"

// SetType ::=
//  SET "{" "}"
// 	| SET "{" ExtensionAndException OptionalExtensionMarker "}"
// 	| SET "{" ComponentTypeLists "}"

// ExtensionAndException ::=
//     "..."
// 	| "..." ExceptionSpec

// OptionalExtensionMarker ::=
// 	"," "..."
// 	| empty

// ComponentTypeLists ::=
//     RootComponentTypeList
// 	| RootComponentTypeList "," ExtensionAndException ExtensionAdditions OptionalExtensionMarker
// 	| RootComponentTypeList "," ExtensionAndException ExtensionAdditions ExtensionEndMarker  "," RootComponentTypeList
// 	| ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
// 	| ExtensionAndException ExtensionAdditions OptionalExtensionMarker

// RootComponentTypeList ::=
//     ComponentTypeList

// ExtensionEndMarker ::= "," "..."

// ExtensionAdditions ::=
//     "," ExtensionAdditionList
// 	| empty

// ExtensionAdditionList ::=
//     ExtensionAddition
// 	| ExtensionAdditionList "," ExtensionAddition

// ExtensionAddition ::=
//     ComponentType
// 	| ExtensionAdditionGroup

// ExtensionAdditionGroup ::=
// 	"[[" VersionNumber ComponentTypeList "]]"

// VersionNumber ::=
// 	empty
// 	| number ":"

// ComponentTypeList ::=
//     ComponentType
// 	| ComponentTypeList "," ComponentType

// ComponentType ::=
//     NamedType
// 	| NamedType OPTIONAL
// 	| NamedType DEFAULT Value
// 	| COMPONENTS OF Type

export default function grok(cst: Production, ctx: GrokContext): Type {
  const text: string = ctx.text;
  const typeType: TypeType =
    cst.type === ProductionType.SequenceType
      ? TypeType.SequenceType
      : TypeType.SetType;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );

  if (components.length <= 3) {
    return {
      text: text.slice(cst.location.startIndex, cst.location.endIndex),
      typeType,
      type: {
        explicitlyExtensible: false,
        hasSelfContainedRootComponentTypeList: true, // Because there are no components.
        hasOptionalRootComponentTypes: false, // Because NO components were encountered.
      },
    };
  }

  if (components[2].type === ProductionType.ExtensionAndException) {
    const ExtensionAndException: Production = components[2];
    const ExceptionSpec: Production =
      ExtensionAndException.children[ExtensionAndException.children.length - 1];
    return {
      text: text.slice(cst.location.startIndex, cst.location.endIndex),
      typeType,
      type: {
        explicitlyExtensible: true,
        exception: ExceptionSpec
          ? grokExceptionSpec(ExceptionSpec, ctx)
          : undefined,
        hasSelfContainedRootComponentTypeList: true, // Because there are no components.
        hasOptionalRootComponentTypes: false, // Because NO components were encountered.
      },
    };
  }

  const ComponentTypeListsComponents: Production[] =
    components[2].children.filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    );

  let RootComponentTypeList1: Production | undefined = undefined;
  let RootComponentTypeList2: Production | undefined = undefined;
  let ExtensionAndException: Production | undefined = undefined;
  let ExtensionAdditions: Production | undefined = undefined;
  let exception: ExceptionIdentification | undefined = undefined;
  const extensible: boolean = ComponentTypeListsComponents.length > 1;

  if (
    ComponentTypeListsComponents[0].type ===
    ProductionType.ExtensionAndException
  ) {
    // 	| ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
    // 	| ExtensionAndException ExtensionAdditions OptionalExtensionMarker
    ExtensionAndException = ComponentTypeListsComponents[0];
    ExtensionAdditions = ComponentTypeListsComponents[1];
    if (
      ComponentTypeListsComponents[2].type === ProductionType.ExtensionEndMarker
    ) {
      RootComponentTypeList2 =
        ComponentTypeListsComponents[ComponentTypeListsComponents.length - 1];
    }

    // ExtensionAndException ::= "..." | "..." ExceptionSpec
    if (ExtensionAndException.children.length > 1) {
      const ExceptionSpec: Production =
        ExtensionAndException.children[
          ExtensionAndException.children.length - 1
        ];
      if (ExceptionSpec.children.length > 0) {
        exception = grokExceptionSpec(ExceptionSpec, ctx);
      }
    }
  } else {
    RootComponentTypeList1 = ComponentTypeListsComponents[0];
    ExtensionAndException = ComponentTypeListsComponents[0];
    ExtensionAdditions = ComponentTypeListsComponents[3];
    RootComponentTypeList2 = ComponentTypeListsComponents[6];
  }

  const rootComponentTypes1: ComponentType[] | undefined =
    RootComponentTypeList1
      ? RootComponentTypeList1.children[0].children // ComponentTypeList
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.ComponentType
          )
          .map((ct: Production) => grokComponentType(ct, ctx))
      : undefined;

  const rootComponentTypes2: ComponentType[] | undefined =
    RootComponentTypeList2
      ? RootComponentTypeList2.children[0].children // ComponentTypeList
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.ComponentType
          )
          .map((ct: Production) => grokComponentType(ct, ctx))
      : undefined;

  const extensionAdditions =
    ExtensionAdditions && ExtensionAdditions.children.length > 0
      ? ExtensionAdditions.children[
          ExtensionAdditions.children.length - 1
        ].children // ExtensionAdditionList
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.ExtensionAddition
          )
          .map((ea: Production) => {
            if (ea.children[0].type === ProductionType.ComponentType) {
              return grokComponentType(ea.children[0], ctx);
            } else {
              // ExtensionAdditionGroup ::= "[[" VersionNumber ComponentTypeList "]]"
              const VersionNumber: Production = ea.children[0].children[3];
              const ComponentTypeList: Production = ea.children[0].children[5];

              const versionNumber: number | undefined =
                VersionNumber.children.length > 0
                  ? Number.parseInt(
                      text.slice(
                        VersionNumber.children[0].location.startIndex,
                        VersionNumber.children[0].location.endIndex
                      ),
                      10
                    )
                  : undefined;

              const componentTypeList: ComponentType[] =
                ComponentTypeList.children
                  .filter(
                    (child: Production): boolean =>
                      child.type === ProductionType.ComponentType
                  )
                  .map((ct: Production) => grokComponentType(ct, ctx));

              return {
                versionNumber,
                componentTypeList,
              };
            }
          })
      : undefined;

  const rootComponentTypes: ComponentType[] = (
    rootComponentTypes1 || []
  ).concat(rootComponentTypes2 || []);
  const hasSelfContainedRootComponentTypeList: boolean =
    !rootComponentTypes.some((rct) => 'componentsOf' in rct);
  const hasOptionalRootComponentTypes: boolean | undefined =
    hasSelfContainedRootComponentTypeList
      ? rootComponentTypes.some(
          (rct) => !('componentsOf' in rct) && rct.optional
        )
      : undefined; // If it is not self-contained, we cannot say for sure.

  return {
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
    typeType,
    type: {
      rootComponentTypeList1: rootComponentTypes1,
      rootComponentTypeList2: rootComponentTypes2,
      extensionAdditionList: extensionAdditions,
      explicitlyExtensible: extensible,
      exception,
      hasSelfContainedRootComponentTypeList,
      hasOptionalRootComponentTypes,
    },
  };
}
