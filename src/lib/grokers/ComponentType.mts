import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ComponentType } from '../constructs/ComponentType.mjs';
import grokType from './Type.mjs';
import grokValue from './Value.mjs';

// ComponentType ::=
//     NamedType
// 	| NamedType OPTIONAL
// 	| NamedType DEFAULT Value
// 	| COMPONENTS OF Type

// export default
// interface ComponentType {
//     namedType: NamedType;
//     optional: boolean;
//     default?: string;
//     componentsOf?: string; // Section 25.5 restricts this type to being a SEQUENCE type anyway.
// }

export default function grok(cst: Production, ctx: GrokContext): ComponentType {
  const text: string = ctx.text;
  if (cst.children[0].type === ProductionType._COMPONENTS) {
    const type: Production = cst.children[cst.children.length - 1];
    return {
      componentsOf: grokType(type, ctx),
    };
  }
  const NamedType: Production = cst.children[0];
  const NamedType_identifier: Production = NamedType.children[0];
  const NamedType_type: Production =
    NamedType.children[NamedType.children.length - 1];
  const optional: boolean = cst.children.length > 1;
  const default_: Production | undefined =
    cst.children[cst.children.length - 1].type === ProductionType.Value
      ? cst.children[cst.children.length - 1]
      : undefined;

  const base: number = ctx.textStartsAtOffset ?? 0;
  return {
    namedType: {
      identifier: text.slice(
        NamedType_identifier.location.startIndex - base,
        NamedType_identifier.location.endIndex - base,
      ),
      type: grokType(NamedType_type, ctx),
    },
    optional,
    default: default_ ? grokValue(default_, ctx) : undefined,
    production: cst,
    productionType: cst.type,
    text: text.slice(
      cst.location.startIndex - base,
      cst.location.endIndex - base,
    ),
  };
}
