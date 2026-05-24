import {
  literal,
  whitespace,
  recursiveParser,
  recyclingSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

export const SymbolsFromModule: Parser = recursiveParser(
  (): Parser =>
    recyclingSequenceOf(
      ProductionType.SymbolsFromModule,
      [
        parserFor.SymbolList,
        whitespace,
        literal(ProductionType._FROM),
        whitespace,
        parserFor.GlobalModuleReference,
      ],
      [whitespace, parserFor.SelectionOption]
    )
);
export default SymbolsFromModule;
