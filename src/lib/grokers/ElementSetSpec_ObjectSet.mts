import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import { ProductionType } from '../ProductionType.mjs';
import { type ElementSetSpec } from '../constructs/ElementSetSpec.mjs';
import {
  type ElementSetSpec_ObjectSet,
  type ObjectSetElement,
} from '../constructs/ElementSetSpec_ObjectSet.mjs';
import { type ObjectSetElements } from '../constructs/ObjectSetElements.mjs';
import grokObject from './Object.mjs';
import grokDefined from './Defined.mjs';
import grokSomethingFromObject from './SomethingFromObject.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

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
      throw new ASN1SyntaxError(
        cst,
        `Unrecognized alternative of ObjectSetElements '${cst.type}'.`,
        ctx.currentModule.name,
      );
    }
  }
}

/**
 * Parentheses that only wrap one element do not change the set. Return that
 * element so `(referral)` groks the same as `referral`.
 */
function unwrapTrivialElementSet(
  spec: ElementSetSpec<ObjectSetElement>
): ObjectSetElement {
  if (
    'unions' in spec &&
    spec.unions.length === 1 &&
    spec.unions[0].intersections.length === 1 &&
    spec.unions[0].intersections[0].exclusions === undefined
  ) {
    return spec.unions[0].intersections[0].elements;
  }
  return spec;
}

/**
 * @param elements A concrete `Elements` production from an object set.
 */
function grokElements(elements: Production, ctx: GrokContext): ObjectSetElement {
  const objectSetElements: Production | undefined = elements.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ObjectSetElements
  );
  if (objectSetElements) {
    const alternative: Production | undefined = objectSetElements.children[0];
    if (!alternative) {
      throw new ASN1SyntaxError(
        objectSetElements,
        'ObjectSetElements has no alternative.',
        ctx.currentModule.name,
      );
    }
    return grokElement(alternative, ctx);
  }
  const nested: Production | undefined = elements.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ElementSetSpec
  );
  if (!nested) {
    throw new ASN1SyntaxError(
      elements,
      'Unrecognized Elements alternative in an object set.',
      ctx.currentModule.name,
    );
  }
  return unwrapTrivialElementSet(grok(nested, ctx));
}

export default function grok(
  cst: Production,
  ctx: GrokContext
): ElementSetSpec_ObjectSet {
  if (cst.children[0].type === ProductionType._ALL) {
    const Exclusions = cst.children[cst.children.length - 1];
    const excludedElements =
      Exclusions.children[Exclusions.children.length - 1];
    return {
      allExcept: grokElements(excludedElements, ctx),
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
            const elements = grokElements(Elements, ctx);
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
              return {
                elements,
                exclusions: grokElements(excludedElements, ctx),
              };
            }
          })
      )
      .map((intersections) => ({ intersections })),
  };
}
