import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ElementSetSpec } from '../constructs/ElementSetSpec.mjs';

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

export default function grok(
  cst: Production,
  ctx: GrokContext
): ElementSetSpec<string> {
  const text: string = ctx.text;
  const base: number = ctx.textStartsAtOffset ?? 0;
  if (cst.children[0].type === ProductionType._ALL) {
    const Exclusions = cst.children[cst.children.length - 1];
    const excludedElements =
      Exclusions.children[Exclusions.children.length - 1];
    const xeLoc = excludedElements.location;
    return {
      allExcept: text.slice(
        xeLoc.startIndex - base,
        xeLoc.endIndex - base,
      ),
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
            if (ie.children.length === 1) {
              return {
                elements: text.slice(
                  ie.location.startIndex - base,
                  ie.location.endIndex - base,
                ),
              };
            } else {
              const Elements: Production = ie.children[0];
              const Exclusions: Production =
                ie.children[ie.children.length - 1];
              const excludedElements: Production =
                Exclusions.children[Exclusions.children.length - 1];
              return {
                elements: text.slice(
                  Elements.location.startIndex - base,
                  Elements.location.endIndex - base,
                ),
                exclusions: text.slice(
                  excludedElements.location.startIndex - base,
                  excludedElements.location.endIndex - base,
                ),
              };
            }
          })
      )
      .map((intersections) => ({ intersections })),
  };
}
