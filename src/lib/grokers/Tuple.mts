import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type Tuple from '../constructs/Tuple.mjs';

// Tuple ::= "{" TableColumn "," TableRow "}"
// TableColumn ::= number
// TableRow ::= number

export default function grok(cst: Production, ctx: GrokContext): Tuple {
  const text: string = ctx.text;
  const components: Production[] = cst.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean =>
        child.type !== ProductionType.whitespace &&
        child.type !== ProductionType.comma
    );

  const TableColumn: Production = components[0];
  const TableRow: Production = components[1];

  return {
    column: Number.parseInt(
      text.slice(
        TableColumn.location.startIndex,
        TableColumn.location.endIndex
      ),
      10
    ),
    row: Number.parseInt(
      text.slice(TableRow.location.startIndex, TableRow.location.endIndex),
      10
    ),
  };
}
