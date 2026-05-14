import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
