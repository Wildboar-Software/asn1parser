import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ConstraintSpec ::= SubtypeConstraint | GeneralConstraint`
 * `GeneralConstraint ::= UserDefinedConstraint | TableConstraint | ContentsConstraint`
 * `UserDefinedConstraint ::= CONSTRAINED BY "{" UserDefinedConstraintParameter "," * "}"`
 * `TableConstraint ::= SimpleTableConstraint | ComponentRelationConstraint`
 * `ComponentRelationConstraint ::= "{" DefinedObjectSet "}" "{" AtNotation "," + "}"`
 * `SimpleTableConstraint ::= ObjectSet`
 * `ContentsConstraint ::= CONTAINING Type | ENCODED BY Value | CONTAINING Type ENCODED BY Value`
 * `SubtypeConstraint ::= ElementSetSpecs`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        parserFor.GeneralConstraint, // Only used here.
        parserFor.SubtypeConstraint, // Only used here.
      ],
      ProductionType.ConstraintSpec
    )
);
