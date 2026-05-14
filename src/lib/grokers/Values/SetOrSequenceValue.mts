import type GrokContext from '../../interfaces/GrokContext.js';
import type Production from '../../Production.js';
import { type SetOrSequenceValue } from '../../constructs/Values/SetOrSequenceValue.js';
import grokValue from '../Value.js';
import ProductionType from '../../ProductionType.js';

// SequenceValue ::=
//     "{" ComponentValueList "}"
//     | "{" "}"

// ComponentValueList ::=
//     NamedValue
// 	| ComponentValueList "," NamedValue

export default function grokSetOrSequenceValue(
  cst: Production,
  ctx: GrokContext
): SetOrSequenceValue {
  const text: string = ctx.text;
  const ComponentValueList: Production | undefined = cst.children.find(
    (child: Production): boolean =>
      child.type === ProductionType.ComponentValueList
  );
  if (!ComponentValueList) {
    return [];
  }
  return ComponentValueList.children
    .filter(
      (child: Production): boolean => child.type === ProductionType.NamedValue
    )
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
}
