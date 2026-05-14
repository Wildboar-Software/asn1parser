import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import { type CharacterStringValue } from '../../constructs/Values/CharacterStringValue.mjs';
import ProductionType from '../../ProductionType.mjs';
import grokSetOrSequenceValue from './SetOrSequenceValue.mjs';
import grokTuple from '../Tuple.mjs';
import grokQuadruple from '../Quadruple.mjs';
import grokDefined from '../Defined.mjs';
import unescapeCstring from '../../unescapeCstring.mjs';

// CharacterStringValue ::=
//     RestrictedCharacterStringValue
//     | UnrestrictedCharacterStringValue

// RestrictedCharacterStringValue ::=
//     cstring
// 	| CharacterStringList
// 	| Quadruple
// 	| Tuple

// CharacterStringList ::=
// 	"{" CharSyms "}"

// CharSyms ::=
//     CharsDefn
// 	| CharSyms "," CharsDefn

// CharsDefn ::=
//     cstring
// 	| Quadruple
// 	| Tuple
// 	| DefinedValue

export default function grok(
  cst: Production,
  ctx: GrokContext
): CharacterStringValue {
  const text: string = ctx.text;
  if (cst.children[0].type === ProductionType.RestrictedCharacterStringValue) {
    const RestrictedCharacterStringValue: Production = cst.children[0];
    switch (RestrictedCharacterStringValue.children[0].type) {
      case ProductionType.cstring: {
        return unescapeCstring(
          text.slice(cst.location.startIndex, cst.location.endIndex)
        );
      }
      case ProductionType.Tuple: {
        return grokTuple(RestrictedCharacterStringValue.children[0], ctx);
      }
      case ProductionType.Quadruple: {
        return grokQuadruple(RestrictedCharacterStringValue.children[0], ctx);
      }
      case ProductionType.CharacterStringList: {
        const CharacterStringList: Production =
          RestrictedCharacterStringValue.children[0];
        const CharSyms: Production = CharacterStringList.children.find(
          (child: Production): boolean => child.type === ProductionType.CharSyms
        ) as Production;
        return CharSyms.children
          .filter(
            (child: Production): boolean =>
              child.type === ProductionType.CharsDefn
          )
          .map((cd: Production) => {
            switch (cd.children[0].type) {
              case ProductionType.cstring: {
                return unescapeCstring(
                  text.slice(cd.location.startIndex, cd.location.endIndex)
                );
              }
              case ProductionType.Tuple: {
                return grokTuple(cd.children[0], ctx);
              }
              case ProductionType.Quadruple: {
                return grokQuadruple(cd.children[0], ctx);
              }
              case ProductionType.DefinedValue: {
                return grokDefined(cd.children[0], ctx);
              }
              default: {
                throw new Error(
                  `Unrecognized CharsDefn alternative '${cd.children[0].type}'.`
                );
              }
            }
          });
      }
      default: {
        throw new Error(
          'Unrecognized RestrictedCharacterStringValue alternative ' +
            `'${RestrictedCharacterStringValue.children[0].type}'.`
        );
      }
    }
  } else {
    return grokSetOrSequenceValue(cst.children[0].children[0].children[0], ctx);
  }
}
