import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ElementSetSpec } from '../constructs/ElementSetSpec.js';
import { type ObjectSetElements } from '../constructs/ObjectSetElements.js';
import grokObject from './Object.js';
import grokDefined from './Defined.js';
import grokSomethingFromObject from './SomethingFromObject.js';

// ElementSetSpec ::=
//     Unions
// 	| ALL Exclusions

// Unions ::=
//     Intersections
// 	| UElems UnionMark Intersections

// UElems ::=
// 	Unions

// Intersections ::=
//     IntersectionElements
// 	| IElems IntersectionMark IntersectionElements

// IElems ::=
// 	Intersections

// IntersectionElements ::=
//     Elements
// 	| Elems Exclusions

// Elems ::=
// 	Elements

// Exclusions ::=
// 	EXCEPT Elements

// UnionMark ::=
// 	"|"
// 	| UNION

// IntersectionMark ::=
// 	"^"
// 	| INTERSECTION

// Elements ::=
//     SubtypeElements
// 	| ObjectSetElements
// 	| "(" ElementSetSpec ")"

// ObjectSetElements ::= Object | DefinedObjectSet | ObjectSetFromObjects | ParameterizedObjectSet

/**
 *
 * @param cst Must be an alternative of `ObjectSetElements`
 */
function grokElement(cst: Production, ctx: GrokContext): ObjectSetElements {
  switch (cst.type) {
    case ProductionType.Object: {
      return grokObject(cst, ctx);
    }
    case ProductionType.ObjectSetFromObjects: {
      return grokSomethingFromObject(cst, ctx);
    }
    case ProductionType.ParameterizedObjectSet:
    case ProductionType.DefinedObjectSet: {
      return grokDefined(cst, ctx);
    }
    default: {
      throw new Error(cst.type);
    }
  }
}

export default function grok(
  cst: Production,
  ctx: GrokContext
): ElementSetSpec<ObjectSetElements> {
  if (cst.children[0].type === ProductionType._ALL) {
    const Exclusions = cst.children[cst.children.length - 1];
    const excludedElements =
      Exclusions.children[Exclusions.children.length - 1];
    const ObjectSetElements_: Production = excludedElements.children[0];
    const oseAlt: Production = ObjectSetElements_.children[0];
    return {
      allExcept: grokElement(oseAlt, ctx),
    };
  }
  const Unions: Production = cst.children[0];
  return {
    unions: Unions.children
      .filter(
        (child: Production): boolean =>
          child.type === ProductionType.Intersections
      )
      .map((intersection: Production) =>
        intersection.children
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.IntersectionElements
          )
          .map((ie: Production) => {
            const Elements: Production = ie.children[0];
            const ObjectSetElements_: Production = Elements.children[0];
            const oseAlt: Production = ObjectSetElements_.children[0];
            const elements = grokElement(oseAlt, ctx);
            if (ie.children.length === 1) {
              // Just `Elements`
              return {
                elements,
              };
            } else {
              // `Elems Exclusions`
              const Exclusions: Production =
                ie.children[ie.children.length - 1];
              const excludedElements: Production =
                Exclusions.children[Exclusions.children.length - 1];
              const ObjectSetElements_: Production =
                excludedElements.children[0];
              const oseAlt: Production = ObjectSetElements_.children[0];
              const exclusions = grokElement(oseAlt, ctx);
              return {
                elements,
                exclusions,
              };
            }
          })
      )
      .map((intersections) => ({ intersections })),
  };
}
