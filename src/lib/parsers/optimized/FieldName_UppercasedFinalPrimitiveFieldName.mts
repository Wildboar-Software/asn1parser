import * as parserFor from '../specific/index.mjs';
import Parser from '../../Parser.mjs';
import type ParseContext from '../../interfaces/ParseContext.mjs';

/**
 * @summary Parser for a `FieldName` that ends with a upper-cased identifier.
 * @description
 * This parser only parses a `FieldName` whose final `PrimitiveFieldName` ends
 * with an identifier whose first letter is upper-cased. The value in doing this
 * is that all of the `InformationFromObjects` productions are identical,
 * according to the ABNF, but they can be distinguished by the capitalization
 * of the final `PrimitiveFieldName` of the `FieldName`. If it starts with a
 * lower-cased letter, it must refer only to a value or an information object.
 * If it starts with an upper-cased letter, it must refer to a type, value set,
 * or information object set.
 * @constant {Parser}
 */
export const FieldName_UppercasedFinalPrimitiveFieldName: Parser = new Parser(
  () => 'FieldName with uppercased final PrimitiveFieldName',
  (state: ParseContext): ParseContext => {
    const fn = parserFor.FieldName.execute(state);
    if (fn.error) {
      return fn;
    }
    const loc = fn.cst.location;
    const fieldNameText: string = state.text.slice(
      loc.startIndex,
      loc.endIndex
    );
    const primitiveFieldNames: string[] = fieldNameText
      .split('.')
      .map((c) => c.replace('&', ''));
    const finalPrimitiveFieldName: string =
      primitiveFieldNames[primitiveFieldNames.length - 1];
    const firstChar: string = finalPrimitiveFieldName.slice(0, 1);
    if (firstChar.toUpperCase() === firstChar) {
      return fn;
    } else {
      return {
        ...fn,
        error: true,
      };
    }
  }
);
export default FieldName_UppercasedFinalPrimitiveFieldName;
