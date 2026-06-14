import type Module from './constructs/Module.mjs';
import AssignmentType from './constructs/AssignmentType.mjs';
import type GrokContext from './interfaces/GrokContext.mjs';
import isTypeCompatibleWithValue from './isTypeCompatibleWithValue.mjs';
import lex from './lex.mjs';
import valueParser from './parsers/generic/valueParser.mjs';
import valueGroker from './grokers/Value.mjs';
import consoleLogger from './loggers/console.mjs';
import unconfuseObjectAndValueAssignments from './correctors/unconfuseObjectAndValueAssignments.mjs';
import unconfuseSettings from './correctors/unconfuseSettings.mjs';
import getInnerType from './getUnprefixedType.mjs';
import TypeType from './constructs/TypeType.mjs';
import ValueType from './constructs/ValueType.mjs';
import iterateOverComponentTypes from './iterateOverComponentTypes.mjs';
import iterateOverAlternatives from './iterateOverAlternatives.mjs';
import getBuiltinType from './getBuiltinType.mjs';
import getDuplicates from './getDuplicates.mjs';
import { LexicalProductionType } from "./ProductionType.mjs";

/**
 * Correct errors made during parsing.
 *
 * @param {Module[]} modules All modules in scope.
 */
export default function correct(modules: Module[]): void {
    const duplicates = Array.from(getDuplicates(modules.map((mod) => mod.name)));
    if (duplicates.length > 0) {
        throw new Error(`Duplicated modules: ${duplicates.join(", ")}`);
    }
  modules.forEach((module) =>
    Object.values(module.assignments).forEach((assn) => {
      unconfuseObjectAndValueAssignments(assn, module, modules);
      switch (assn.assignmentType) {
        case AssignmentType.ValueAssignment: {
          const builtinType = getBuiltinType(assn.type, module, modules);
          if (
            assn.value &&
            builtinType &&
            !isTypeCompatibleWithValue(builtinType, assn.value)
          ) {
            const lexemes = Array.from(lex(assn.value.text, assn.value.production?.location))
              .filter((l) => l.type !== LexicalProductionType.comment);
            const parsing = valueParser(builtinType.typeType).start(
              lexemes,
              assn.value.text
            );
            if (
              !parsing.error &&
              Object.keys(parsing.syntaxErrors).length === 0
            ) {
              const newCtx: GrokContext = {
                log: consoleLogger,
                text: assn.value.text,
                currentModule: module,
                enumItems: parsing.definedEnumItems,
              };
              assn.value = valueGroker(parsing.cst, newCtx);
            }
          }
          break;
        }
        case AssignmentType.TypeAssignment: {
          const innerType = getInnerType(assn.type);
          if (
            innerType.typeType === TypeType.SequenceType ||
            innerType.typeType === TypeType.SetType
          ) {
            const components = iterateOverComponentTypes(innerType.type);
            for (const component of components) {
              if ('componentsOf' in component) {
                continue;
              }
              if (!component.default) {
                continue;
              }
              const t = getBuiltinType(
                component.namedType.type,
                module,
                modules
              );
              const v = component.default;
              if (v && v.text && t && !isTypeCompatibleWithValue(t, v)) {
                const lexemes = Array.from(lex(v.text, v.production?.location))
                  .filter((l) => l.type !== LexicalProductionType.comment);
                const parsing = valueParser(t.typeType).start(lexemes, v.text);
                if (
                  !parsing.error &&
                  Object.keys(parsing.syntaxErrors).length === 0
                ) {
                  const newCtx: GrokContext = {
                    log: consoleLogger,
                    text: v.text,
                    currentModule: module,
                    enumItems: parsing.definedEnumItems,
                  };
                  component.default = valueGroker(parsing.cst, newCtx);
                }
              }

              // IF t and v are CHOICE, iterate over all alternatives, reparsing them.
              if (
                t &&
                v &&
                t.typeType === TypeType.ChoiceType &&
                v.valueType === ValueType.ChoiceValue
              ) {
                const alts = Array.from(iterateOverAlternatives(t.type));
                const chosenType = alts.find(
                  (alt) => alt.identifier === v.value.identifier
                );
                const chosenBuiltinType = chosenType
                  ? getBuiltinType(chosenType.type, module, modules)
                  : undefined;
                const chosenValue = v.value;
                if (
                  chosenBuiltinType &&
                  chosenValue.value.text &&
                  !isTypeCompatibleWithValue(
                    chosenBuiltinType,
                    chosenValue.value
                  )
                ) {
                  const lexemes = Array.from(lex(chosenValue.value.text, chosenValue.value.production?.location))
                    .filter((l) => l.type !== LexicalProductionType.comment);
                  const parsing = valueParser(chosenBuiltinType.typeType).start(
                    lexemes,
                    chosenValue.value.text
                  );
                  if (
                    !parsing.error &&
                    Object.keys(parsing.syntaxErrors).length === 0
                  ) {
                    const newCtx: GrokContext = {
                      log: consoleLogger,
                      text: chosenValue.value.text,
                      currentModule: module,
                      enumItems: parsing.definedEnumItems,
                    };
                    v.value.value = valueGroker(parsing.cst, newCtx);
                  }
                }
              }

              const newV = component.default;
              if (
                t &&
                newV &&
                ((t.typeType === TypeType.SetType &&
                  newV.valueType === ValueType.SetValue) ||
                  (t.typeType === TypeType.SequenceType &&
                    newV.valueType === ValueType.SequenceValue))
              ) {
                const components = Array.from(
                  iterateOverComponentTypes(t.type)
                );
                // components
                newV.value.forEach((cv): void => {
                  // eslint-disable-line
                  const ct = components.find((c) => {
                    if ('componentsOf' in c) {
                      return false;
                    }
                    return c.namedType.identifier === cv.identifier;
                  });
                  if (
                    ct &&
                    cv &&
                    cv.value.text &&
                    !('componentsOf' in ct) &&
                    !isTypeCompatibleWithValue(ct.namedType.type, cv.value)
                  ) {
                    const lexemes = Array.from(lex(cv.value.text, cv.value.production?.location))
                      .filter((l) => l.type !== LexicalProductionType.comment);
                    const componentBuiltinType = getBuiltinType(
                      ct.namedType.type,
                      module,
                      modules
                    );
                    if (componentBuiltinType) {
                      const parsing = valueParser(
                        componentBuiltinType.typeType
                      ).start(lexemes, cv.value.text);
                      if (
                        !parsing.error &&
                        Object.keys(parsing.syntaxErrors).length === 0
                      ) {
                        const newCtx: GrokContext = {
                          log: consoleLogger,
                          text: cv.value.text,
                          currentModule: module,
                          enumItems: parsing.definedEnumItems,
                        };
                        cv.value = valueGroker(parsing.cst, newCtx);
                      }
                    }
                  }
                });
              }
            }
          }
          // TODO: Do this for ChoiceType
          break;
        }
        case AssignmentType.ObjectAssignment: {
          unconfuseSettings(assn, module, modules);
          // TODO: Reparse DEFAULT values.
          break;
        }
        // TODO: Reparse ValueSet values.
        default: {
          break;
        }
      }
    })
  );
}
