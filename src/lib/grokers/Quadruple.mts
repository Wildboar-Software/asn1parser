import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import type Quadruple from '../constructs/Quadruple.js';

// Quadruple ::= "{" Group "," Plane "," Row "," Cell "}"
// Group ::= number
// Plane ::= number
// Row ::= number
// Cell ::= number

export default function grok(cst: Production, ctx: GrokContext): Quadruple {
  const text: string = ctx.text;
  const components: Production[] = cst.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean =>
        child.type !== ProductionType.whitespace &&
        child.type !== ProductionType.comma
    );

  const Group: Production = components[0];
  const Plane: Production = components[1];
  const Row: Production = components[2];
  const Cell: Production = components[3];

  return {
    group: Number.parseInt(
      text.slice(Group.location.startIndex, Group.location.endIndex),
      10
    ),
    plane: Number.parseInt(
      text.slice(Plane.location.startIndex, Plane.location.endIndex),
      10
    ),
    row: Number.parseInt(
      text.slice(Row.location.startIndex, Row.location.endIndex),
      10
    ),
    cell: Number.parseInt(
      text.slice(Cell.location.startIndex, Cell.location.endIndex),
      10
    ),
  };
}
