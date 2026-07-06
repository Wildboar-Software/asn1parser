import { choiceOf, recursiveParser, aliasFor } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

// DefinedValue ::=
//  ExternalValueReference
// 	| valuereference
// 	| ParameterizedValue

// ExternalValueReference ::= modulereference "." valuereference
// ParameterizedValue     ::= SimpleDefinedValue ActualParameterList

/**
 * `ObjIdComponents ::= NameForm | NumberForm | NameAndNumberForm | DefinedValue`
 */
export const ObjIdComponents: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        /* We put this parser here because, if what follows is truly a
        DefinedValue.ParameterizedValue, then the NameForm alternative will
        eat the identifier, and leave the ActualParameterList, and any
        subsequent parsing will encounter an unexpected ActualParameterList.
        In fact, we also do not have to consider the DefinedValue.valuereference
        alternative for this same reason. */
        aliasFor(ProductionType.DefinedValue, parserFor.ParameterizedValue),
        parserFor.NameAndNumberForm,
        parserFor.NameForm,
        parserFor.NumberForm,
        aliasFor(ProductionType.DefinedValue, parserFor.ExternalValueReference),
      ],
      ProductionType.ObjIdComponents
    )
);
export default ObjIdComponents;
