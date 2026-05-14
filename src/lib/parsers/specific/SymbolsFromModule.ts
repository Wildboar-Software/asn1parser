import {
  literal,
  whitespace,
  recursiveParser,
  recyclingSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

export default recursiveParser(
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
