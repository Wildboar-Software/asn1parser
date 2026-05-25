import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type ObjectClassDefn from '../constructs/AssignmentTypes/ObjectClassAssignment/ObjectClassDefn.mjs';
import grokFieldSpec from './FieldSpec.mjs';
import { type FieldSpec } from '../constructs/FieldSpec.mjs';
import grokTokenOrGroupSpec from './TokenOrGroupSpec.mjs';

// ObjectClassDefn ::=
//     CLASS "{" FieldSpec "," + "}" WithSyntaxSpec?

// WithSyntaxSpec ::=
//     WITH SYNTAX SyntaxList

// SyntaxList ::=
//     "{" TokenOrGroupSpec empty + "}"

export default function grok(
  cst: Production,
  ctx: GrokContext
): ObjectClassDefn {
  const text: string = ctx.text;
  const FieldSpec_: Production = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.FieldSpec
  ) as Production;
  const WithSyntaxSpec: Production | undefined = cst.children.find(
    (child: Production): boolean => child.type === ProductionType.WithSyntaxSpec
  );
  const TokenOrGroupSpecs: Production | undefined = WithSyntaxSpec
    ? WithSyntaxSpec.children[WithSyntaxSpec.children.length - 1].children // SyntaxList
        .find(
          (child: Production): boolean =>
            child.type === ProductionType.TokenOrGroupSpec
        )
    : undefined;

  const fieldSpecs: {
    [reference: string]: FieldSpec;
  } = {};
  FieldSpec_.children
    // Yes, I embed FieldSpec within FieldSpec.
    .filter(
      (child: Production): boolean => child.type === ProductionType.FieldSpec
    )
    .forEach((fs: Production): void => {
      const identifier: Production = fs.children[0].children[0];
      const key: string = text.slice(
        identifier.location.startIndex,
        identifier.location.endIndex
      );
      fieldSpecs[key] = grokFieldSpec(fs, ctx);
    });

  const syntax =
    WithSyntaxSpec && TokenOrGroupSpecs
      ? TokenOrGroupSpecs.children
          .filter((togs) => togs.type === ProductionType.TokenOrGroupSpec)
          .map((togs) => grokTokenOrGroupSpec(togs, ctx))
      : undefined;

  return {
    fieldSpecs,
    syntax,
    production: cst,
  };
}
