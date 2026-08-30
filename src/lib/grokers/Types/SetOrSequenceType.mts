import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import TypeType from '../../constructs/TypeType.mjs';
import grokExceptionSpec from '../ExceptionSpec.mjs';
import { type ExceptionIdentification } from '../../constructs/ExceptionIdentification.mjs';
import { type ComponentType } from '../../constructs/ComponentType.mjs';
import grokComponentType from '../ComponentType.mjs';
import { type Type } from '../../constructs/Type.mjs';

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

  // Locate RootComponentTypeList productions by type rather than by
  // hardcoded child indices. A SEQUENCE / SET may start with "..."
  // (ExtensionAndException), in which case there is no first root list
  // and later children such as ExtensionEndMarker may be absent.
  const rootComponentTypeLists: Production[] =
    ComponentTypeListsComponents.filter(
      (child: Production): boolean =>
        child.type === ProductionType.RootComponentTypeList
    );
  const startsWithExtensionAndException: boolean =
    ComponentTypeListsComponents[0]?.type ===
    ProductionType.ExtensionAndException;

  let RootComponentTypeList1: Production | undefined = undefined;
  let RootComponentTypeList2: Production | undefined = undefined;
  if (startsWithExtensionAndException) {
    // 	| ExtensionAndException ExtensionAdditions ExensionEndMarker "," RootComponentTypeList
    // 	| ExtensionAndException ExtensionAdditions OptionalExtensionMarker
    RootComponentTypeList2 = rootComponentTypeLists[0];
  } else {
    RootComponentTypeList1 = rootComponentTypeLists[0];
    RootComponentTypeList2 = rootComponentTypeLists[1];
  }

  const ExtensionAndException: Production | undefined =
    ComponentTypeListsComponents.find(
      (child: Production): boolean =>
        child.type === ProductionType.ExtensionAndException
    );
  const ExtensionAdditions: Production | undefined =
    ComponentTypeListsComponents.find(
      (child: Production): boolean =>
        child.type === ProductionType.ExtensionAdditions
    );

  let exception: ExceptionIdentification | undefined = undefined;
  const extensible: boolean = ExtensionAndException !== undefined;

  // ExtensionAndException ::= "..." | "..." ExceptionSpec
  if (ExtensionAndException && ExtensionAndException.children.length > 1) {
    const ExceptionSpec: Production =
      ExtensionAndException.children[ExtensionAndException.children.length - 1];
    if (
      ExceptionSpec.type === ProductionType.ExceptionSpec &&
      ExceptionSpec.children.length > 0
    ) {
      exception = grokExceptionSpec(ExceptionSpec, ctx);
    }
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

  const ExtensionAdditionList: Production | undefined =
    ExtensionAdditions?.children.find(
      (child: Production): boolean =>
        child.type === ProductionType.ExtensionAdditionList
    );

  const extensionAdditions = ExtensionAdditionList
    ? ExtensionAdditionList.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.ExtensionAddition
        )
        .map((ea: Production) => {
          if (ea.children[0].type === ProductionType.ComponentType) {
            return grokComponentType(ea.children[0], ctx);
          } else {
            // ExtensionAdditionGroup ::= "[[" VersionNumber ComponentTypeList "]]"
            const groupComponents: Production[] =
              ea.children[0].children.filter(
                (child: Production): boolean =>
                  child.type !== ProductionType.whitespace
              );
            const VersionNumber: Production | undefined = groupComponents.find(
              (child: Production): boolean =>
                child.type === ProductionType.VersionNumber
            );
            const ComponentTypeList: Production | undefined =
              groupComponents.find(
                (child: Production): boolean =>
                  child.type === ProductionType.ComponentTypeList
              );

            const versionNumber: number | undefined =
              VersionNumber && VersionNumber.children.length > 0
                ? Number.parseInt(
                    text.slice(
                      VersionNumber.children[0].location.startIndex,
                      VersionNumber.children[0].location.endIndex
                    ),
                    10
                  )
                : undefined;

            const componentTypeList: ComponentType[] = ComponentTypeList
              ? ComponentTypeList.children
                  .filter(
                    (child: Production): boolean =>
                      child.type === ProductionType.ComponentType
                  )
                  .map((ct: Production) => grokComponentType(ct, ctx))
              : [];

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
