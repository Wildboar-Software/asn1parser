import { type DefaultSyntax } from '../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefaultSyntax.mjs';
import { type DefinedSyntax } from '../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefinedSyntax.mjs';
import { type TokenOrGroupSpec } from '../constructs/TokenOrGroupSpec.mjs';
import { type Setting } from '../constructs/AssignmentTypes/ObjectAssignment/Setting.mjs';
import type Module from '../constructs/Module.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import TypeType from '../constructs/TypeType.mjs';
import lex from '../lex.mjs';
import consoleLogger from '../loggers/console.mjs';
import uppercasedFieldParser from '../parsers/optimized/Setting_uppercased.mjs';
import lowercasedFieldParser from '../parsers/optimized/Setting_lowercased.mjs';
import settingGroker from '../grokers/Object/Setting.mjs';
import type GrokContext from '../interfaces/GrokContext.mjs';
import ValueType from '../constructs/ValueType.mjs';
import { LexicalProductionType } from "../ProductionType.mjs";

function isUpperCase(charCode: number): boolean {
  return charCode >= 0x41 && charCode <= 0x5a;
}

function convertSettingToToken(setting: Setting): string | undefined {
  if ('type' in setting && setting.type.typeType === TypeType.DefinedType) {
    return setting.type.type.reference;
  } else if (
    'value' in setting &&
    setting.value.valueType === ValueType.DefinedValue
  ) {
    return setting.value.value.reference;
  }
  // else if (("valueSet" in setting) && (setting.valueSet.)) {

  // }
  else if ('object' in setting && 'reference' in setting.object) {
    return setting.object.reference;
  }
  // else if (("objectSet" in setting)) {

  // }
  else {
    return undefined;
  }
}

/**
 * @summary Translates object defined using `DefinedSyntax` into equivalent
 *  objects defined using `DefaultSyntax`.
 * @description
 * Objects defined with the default syntax are easier to work with, because the
 * settings can be queried as simple key-value pairs. For example, querying an
 * X.500 `ATTRIBUTE`'s `&Type` is a lot easier than navigating the defined
 * syntax to find the `&Type` parameter. Objects defined using the default
 * syntax are also easier for compilation; in most programming languages, they
 * can simply be represented as the language's native equivalent of an "object."
 *
 * This function recurses. If it encounters an `OptionalGroup` in the
 * `TokenOrGroupSpec`, it recurses, using that `OptionalGroup` as its own
 * independent `TokenOrGroupSpec[]`, and continuing to read tokens or settings
 * from where the parent recursion left off using this child recursion with
 * the `OptionalGroup`s subset of the syntax. At the end of the child
 * recursion, the settings that were picked up by the child recursion are
 * merged into the parent recursion's settings.
 *
 * @param {DefinedSyntax} obj The object that is to be translated to the
 *  default syntax.
 * @param {TokenOrGroupSpec[]} syntax The syntax used to define objects of the
 *  object class to which `obj` belongs.
 * @param {Module} currentModule The current ASN.1 module.
 * @returns {Array} A tuple whose first element is the `DefaultSyntax`
 *  constructed from that recursion, and whose second element is the number of
 *  tokens read
 * @function
 */
export default function translateDefinedSyntaxToDefaultSyntax(
  obj: DefinedSyntax,
  syntax: TokenOrGroupSpec[],
  currentModule: Module
): [result: DefaultSyntax | null, tokensRead: number] {
  let s: number = 0; // Our index into the syntax tokens.
  let t: number = 0; // Our index into the object's tokens.
  const settings: Record<string, Setting> = {};
  while (t < obj.length) {
    const expected = syntax[s];
    const token = obj[t];
    if (typeof expected === 'string') {
      if (expected.startsWith('&')) {
        // Expecting a field setting.
        if (typeof token === 'string') {
          // We got a Literal when we were expecting a Setting.
          /**
           * We look for that token in the assignments of the current
           * module. If we find an assignment, we just replace that
           * token with a Defined* that points to it.
           */
          if (token in currentModule.assignments) {
            const assignment = currentModule.assignments[token];
            /**
             * Only a Type, ValueSet, or ObjectSet could be mistaken
             * for a Setting. ObjectClass cannot be a Setting.
             */
            switch (assignment.assignmentType) {
              case AssignmentType.TypeAssignment:
              case AssignmentType.ValueSetTypeAssignment: {
                settings[expected] = {
                  type: {
                    text: token,
                    typeType: TypeType.DefinedType,
                    type: {
                      reference: token,
                      computedModule: currentModule.name,
                    },
                  },
                };
                break;
              }
              case AssignmentType.ObjectSetAssignment: {
                console.error(obj);
                throw new Error(`6578ad9d-c5f5-4225-a7ff-7f47874e3e99 in ${currentModule.name}`); // I don't know what to do in this case.
              }
              default: {
                console.error(obj);
                throw new Error(`c18376de-8938-4842-8efc-2aa3d074b711 in ${currentModule.name}`);
              }
            }
          } else {
            console.error(obj);
            throw new Error(`01f8ac49-728d-4c20-913c-a8e5dfe73acf in ${currentModule.name}`);
          }
        } else if (token.text) {
          const upperCasedFieldName = isUpperCase(expected.charCodeAt(1));
          if (upperCasedFieldName) {
            if ('value' in token || 'object' in token) {
              // We parsed a value or object when we should have parsed a type, value set, or object set.
              const lexemes = Array.from(lex(token.text)).filter((l) => l.type !== LexicalProductionType.comment);
              const parsing = uppercasedFieldParser.start(lexemes, token.text);
              if (
                !parsing.error &&
                Object.keys(parsing.syntaxErrors).length === 0
              ) {
                const newCtx: GrokContext = {
                  log: consoleLogger,
                  text: token.text,
                  currentModule,
                  enumItems: parsing.definedEnumItems,
                };
                if ('value' in token) {
                  delete (token as {value?: any}).value;
                }
                if ('object' in token) {
                  delete (token as {object?: any}).object;
                }
                Object.assign(token, settingGroker(parsing.cst, newCtx));
              }
            }
          } else if (
            'type' in token ||
            'valueSet' in token ||
            'objectSet' in token
          ) {
            // We parsed a type, value set, or object set when we should have parsed a value or object.
            const lexemes = Array.from(lex(token.text)).filter((l) => l.type !== LexicalProductionType.comment);
            const parsing = lowercasedFieldParser.start(lexemes, token.text);
            if (
              !parsing.error &&
              Object.keys(parsing.syntaxErrors).length === 0
            ) {
              const newCtx: GrokContext = {
                log: consoleLogger,
                text: token.text,
                currentModule,
                enumItems: parsing.definedEnumItems,
              };
              if ('type' in token) {
                delete (token as {type?: any}).type;
              }
              if ('valueSet' in token) {
                delete (token as {valueSet?: any}).valueSet;
              }
              if ('objectSet' in token) {
                delete (token as {objectSet?: any}).objectSet;
              }
              Object.assign(token, settingGroker(parsing.cst, newCtx));
            }
          }
          settings[expected] = token;
        }
      } else if (token !== expected) {
        // Expecting a Literal.
        /**
         * The token may have been misidentified as a "Setting" instead
         * of a "Literal" in some circumstances. Here, we "cast" the
         * setting to a Literal, then check if it still doesn't match.
         *
         * This "cast" was implemented because the X.400 specifications
         * use "MATCHING-RULE" as a keyword in defined syntax. Because
         * "MATCHING-RULE" was already imported as symbol, it was
         * guessed to be a reference to that symbol instead of a literal
         * at parsing-time.
         */
        if (typeof token !== 'string') {
          const tokenized: string | undefined = convertSettingToToken(token);
          if (tokenized !== expected) {
            return [null, 0];
          }
        } else {
          return [null, 0];
        }
      }
    } else if (typeof expected === 'object' && Array.isArray(expected)) {
      // Expecting a group.
      const [results, tokensRead] = translateDefinedSyntaxToDefaultSyntax(
        obj.slice(t),
        expected,
        currentModule
      );
      if (results) {
        Object.entries(results.fieldSettings).forEach((entry) => {
          // FIXME: Object.assign()
          settings[entry[0]] = entry[1];
        });
        t += tokensRead;
      }
      s++;
      continue;
    } else if (typeof expected === 'undefined') {
      break; // If we are at the end of the syntax list.
    } else {
      console.error(obj);
      throw new Error(`823ccda4-063c-4db1-ab5f-5d5a5f9b0491 in ${currentModule.name}`);
    }
    s++;
    t++;
  }
  return [
    {
      fieldSettings: settings,
    },
    t,
  ];
}
