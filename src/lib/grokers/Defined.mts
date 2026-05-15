import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type Defined from '../constructs/Defined.mjs';
import { type ActualParameter } from '../constructs/ActualParameter.mjs';
import grokActualParameter from './ActualParameter.mjs';
import type SymbolsFromModule from '../constructs/SymbolsFromModule.mjs';

// DefinedValue ::=
//     ExternalValueReference
//     | valuereference
//     | ParameterizedValue

// DefinedType ::=
//     ExternalTypeReference
//     | typereference
//     | ParameterizedType
//     | ParameterizedValueSetType

// ExternalValueReference ::=
//     modulereference "." valuereference

// ParameterizedValue ::=
//     SimpleDefinedValue ActualParameterList

// SimpleDefinedValue ::=
//     ExternalValueReference
//     | valuereference

// ActualParameterList ::=
//     "{" ActualParameter "," + "}"

// ActualParameter ::=
//     Type
//     | Value
//     | ValueSet
//     | DefinedObjectClass
//     | Object
//     | ObjectSet

// DefinedObjectClass ::=
//     ExternalObjectClassReference
//     | objectclassreference
//     | UsefulObjectClassReference

// ExternalObjectClassReference ::=
//     modulereference "." objectclassreference

// UsefulObjectClassReference ::=
//     TYPE-IDENTIFIER
//     | ABSTRACT-SYNTAX

// DefinedObject ::=
//     ExternalObjectReference
//     | objectreference

// ExternalObjectReference ::=
//     modulereference "." objectreference

// SimpleDefinedType ::=
//     ExternalTypeReference
//     | typereference

// SimpleDefinedValue ::=
//     ExternalValueReference
//     | valuereference

// ParameterizedType ::=
//     SimpleDefinedType ActualParameterList

// ParameterizedValue ::=
//     SimpleDefinedValue ActualParameterList

// ParameterizedValueSetType ::=
//     SimpleDefinedType ActualParameterList

// ParameterizedObjectClass ::=
//     DefinedObjectClass ActualParameterList

// ParameterizedObjectSet ::=
//     DefinedObjectSet ActualParameterList

// ParameterizedObject ::=
//     DefinedObject ActualParameterList

// ActualParameterList ::=
//     "{" ActualParameter "," + "}"

// ActualParameter ::=
//     Type
//     | Value
//     | ValueSet
//     | DefinedObjectClass
//     | Object
//     | ObjectSet

// DefinedObjectSet ::=
//     ExternalObjectSetReference
//     | objectsetreference

// ExternalObjectSetReference ::=
//     modulereference "." objectsetreference

export default function grok(cst: Production, ctx: GrokContext): Defined {
  const text: string = ctx.text;
  switch (cst.children[0].type) {
    case ProductionType.DefinedValue:
    case ProductionType.DefinedType:
    case ProductionType.DefinedObject:
    case ProductionType.DefinedObjectClass:
    case ProductionType.DefinedObjectSet: {
      const d = grok(cst.children[0], ctx);
      d.production = cst;
      d.productionType = cst.type;
      return d;
    }
    case ProductionType.ExternalValueReference:
    case ProductionType.ExternalTypeReference:
    case ProductionType.ExternalObjectReference:
    case ProductionType.ExternalObjectClassReference:
    case ProductionType.ExternalObjectSetReference: {
      const ExternalReference: Production = cst.children[0];
      const [mod, ref] = text
        .slice(
          ExternalReference.location.startIndex,
          ExternalReference.location.endIndex
        )
        .split('.');
      return {
        module: mod.trim(),
        reference: ref.trim(),
        computedModule: mod.trim(),
        production: cst,
        productionType: cst.type,
      };
    }
    case ProductionType.valuereference:
    case ProductionType.typereference:
    case ProductionType.objectreference:
    case ProductionType.objectclassreference:
    case ProductionType.objectsetreference:
    case ProductionType.UsefulObjectClassReference: {
      const reference: string = text.slice(
        cst.children[0].location.startIndex,
        cst.children[0].location.endIndex
      );
      return {
        reference,
        computedModule:
          Object.values(ctx.currentModule.imports?.modules ?? {}).find(
            (sfm: SymbolsFromModule): boolean => reference in sfm.symbolList
          )?.identifier ?? ctx.currentModule.name!,
        production: cst,
        productionType: cst.type,
      };
    }
    case ProductionType.ParameterizedType:
    case ProductionType.ParameterizedValue:
    case ProductionType.ParameterizedValueSetType:
    case ProductionType.ParameterizedObjectClass:
    case ProductionType.ParameterizedObjectSet:
    case ProductionType.ParameterizedObject: {
      const Parameterized: Production = cst.children[0];
      const SimpleDefined: Production = Parameterized.children[0];
      const ActualParameterList: Production =
        Parameterized.children[Parameterized.children.length - 1];
      if (!SimpleDefined || !ActualParameterList) {
        throw new Error(
          'Undefined SimpleDefined* or ActualParameterList in Defined* Parameterized* alternative.'
        );
      }
      const sd: string[] = text
        .slice(
          SimpleDefined.location.startIndex,
          SimpleDefined.location.endIndex
        )
        .replace(/\s+/gu, '')
        .split('.');
      const reference: string = sd.pop() as string;
      const module: string | undefined = sd.pop();
      const parametersList: Production | undefined =
        ActualParameterList.children
          // Yes, currently, my parser embeds an ActualParameterList within itself.
          .find(
            (child: Production): boolean =>
              child.type === ProductionType.ActualParameterList
          );
      if (!parametersList) {
        throw new Error('No ActualParameterList within ActualParameterList.');
      }
      const parameters: ActualParameter[] = parametersList.children
        .filter(
          (child: Production): boolean =>
            child.type === ProductionType.ActualParameter
        )
        .map(
          (param: Production): ActualParameter =>
            grokActualParameter(param, ctx)
        );
      return {
        module,
        reference,
        parameters,
        computedModule:
          Object.values(ctx.currentModule.imports?.modules ?? {}).find(
            (sfm: SymbolsFromModule): boolean => reference in sfm.symbolList
          )?.identifier ?? ctx.currentModule.name!,
        production: cst,
        productionType: cst.type,
      };
    }
    default: {
      throw new Error(
        `Unrecognized Defined* subtype '${cst.children[0].type}'.`
      );
    }
  }
}
