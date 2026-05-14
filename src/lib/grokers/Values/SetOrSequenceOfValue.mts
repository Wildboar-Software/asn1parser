import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type SetOrSequenceOfValue } from '../../constructs/Values/SetOrSequenceOfValue.mjs';
import grokValue from '../Value.mjs';
import ProductionType from '../../ProductionType.mjs';

// SequenceOfValue ::=
//     "{" ValueList "}"
// 	| "{" NamedValueList "}"
// 	| "{" "}"

// ValueList ::=
// 	Value
// 	| ValueList "," Value

// NamedValueList ::=
//     NamedValue
// 	| NamedValueList "," NamedValue

export default function grokSetOrSequenceOfValue(
  cst: Production,
  ctx: GrokContext
): SetOrSequenceOfValue {
  const text: string = ctx.text;
  const determinant: Production | undefined = cst.children
    .slice(1, -1) // Remove curlies.
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )[0];
  if (!determinant) {
    return [];
  }
  if (determinant.type === ProductionType.ValueList) {
    return determinant.children
      .filter((child: Production) => child.type === ProductionType.Value)
      .map((value: Production) => ({ value: grokValue(value, ctx) }));
  } else if (determinant.type === ProductionType.NamedValueList) {
    return determinant.children
      .filter((child: Production) => child.type === ProductionType.NamedValue)
      .map((namedValue: Production) => {
        const name: string = text.slice(
          namedValue.children[0].location.startIndex,
          namedValue.children[0].location.endIndex
        );
        return {
          identifier: name,
          value: grokValue(
            namedValue.children[namedValue.children.length - 1],
            ctx
          ),
        };
      });
  } else {
    throw new Error(
      `Unrecognized alternative for SequenceOfValue '${determinant.type}'.`
    );
  }
}
