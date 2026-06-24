import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type SetOrSequenceValue } from '../../constructs/Values/SetOrSequenceValue.mjs';
import grokValue from '../Value.mjs';
import ProductionType from '../../ProductionType.mjs';

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
  const base: number = ctx.textStartsAtOffset ?? 0;
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
        namedValue.children[0].location.startIndex - base,
        namedValue.children[0].location.endIndex - base
      );
      return {
        identifier: name,
        value: grokValue(
          namedValue.children[namedValue.children.length - 1],
          ctx
        ),
        production: namedValue,
        productionType: namedValue.type,
        text: text.slice(
          namedValue.location.startIndex - base,
          namedValue.location.endIndex - base
        ),
      };
    });
}
