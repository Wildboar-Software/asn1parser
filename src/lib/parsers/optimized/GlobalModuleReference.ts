import {
  choiceOf,
  optional,
  recursiveParser,
  sequenceOf,
  whitespace,
  literal,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import type ParseContext from '../../interfaces/ParseContext.js';

/**
 * @summary `GlobalModuleReference` that avoids a sneaky problem
 * @description
 * `AssignedIdentifier` is optional, but its optionality is expressed
 * here, rather than in the `AssignedIdentifier` parser itself, so that the
 * whitespace indicated by the UUID `E598CE51-30B1-46E4-8A96-4CA0D29B95F0` is
 * not consumed illegitimately.
 *
 * This parser also fixes another sneaky issue that can appear where an imported
 * symbol may be interpreted as the `AssignedIdentifier` of a module. See the
 * source of this function for more information.
 *
 * ### ASN.1 ABNF Definition
 *
 * ```abnf
 * GlobalModuleReference ::= modulereference AssignedIdentifier`
 * ```
 * @constant {Parser}
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      /**
       * This custom parser exists to deal with a very specific issue. If the
       * `AssignedIdentifier` is not used in the `GlobalModuleReference` production,
       * and the `GlobalModuleReference` production is followed by another
       * `SymbolsFromModule` production that starts with an imported symbol that
       * starts with a lowercased letter, said symbol may be interpreted as the
       * `DefinedValue` alternative of the `AssignedIdentifier` production. Then
       * the parser would read a comma or FROM after the symbol and fail, because
       * it expected another symbol.
       *
       * The solution to this is to read ahead and check if the next non-whitespace
       * token is a comma or FROM. If either of these cases are true, we know that
       * we just read a symbol from the subsequent `SymbolsFromModule` production
       * rather than a `DefinedValue` for the `AssignedIdentifier` production.
       */
      new Parser(
        () => 'GlobalModuleReference with AssignedIdentifier',
        (state: ParseContext): ParseContext => {
          const problematicParser: Parser = sequenceOf(
            ProductionType.GlobalModuleReference,
            [
              parserFor.modulereference,
              optional(whitespace), // E598CE51-30B1-46E4-8A96-4CA0D29B95F0
              parserFor.AssignedIdentifier,
              optional(whitespace),
              choiceOf([
                literal(ProductionType.comma),
                literal(ProductionType._FROM),
              ]),
            ]
          );

          const problem: ParseContext = problematicParser.execute(state);
          if (problem.error) {
            return sequenceOf(ProductionType.GlobalModuleReference, [
              parserFor.modulereference,
              optional(whitespace), // E598CE51-30B1-46E4-8A96-4CA0D29B95F0
              parserFor.AssignedIdentifier,
            ]).execute(state);
          } else {
            // We read an imported symbol as the AssignedIdentifier.
            return sequenceOf(ProductionType.GlobalModuleReference, [
              parserFor.modulereference,
            ]).execute(state);
          }
        }
      ),
      sequenceOf(ProductionType.GlobalModuleReference, [
        parserFor.modulereference,
      ]),
    ])
);
