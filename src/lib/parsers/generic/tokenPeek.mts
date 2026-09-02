import type ParseContext from '../../interfaces/ParseContext.mjs';
import Production from '../../Production.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * @summary Restricted-character-string type keywords.
 */
export const RESTRICTED_CHARACTER_STRING_TYPES: readonly ProductionType[] = [
  ProductionType._BMPString,
  ProductionType._GeneralString,
  ProductionType._GraphicString,
  ProductionType._IA5String,
  ProductionType._ISO646String,
  ProductionType._NumericString,
  ProductionType._PrintableString,
  ProductionType._TeletexString,
  ProductionType._T61String,
  ProductionType._UniversalString,
  ProductionType._UTF8String,
  ProductionType._VideotexString,
  ProductionType._VisibleString,
];

/**
 * @summary FIRST set of `BuiltinType` / `UsefulType` keywords and class refs.
 * @description
 * Tokens that can begin a `Type` without needing a following `<` / `.` / `{`
 * (those extra tokens are required only for `identifier`).
 *
 * Covers:
 * - `BuiltinType` keywords (`INTEGER`, `SEQUENCE`, `UTF8String`, …)
 * - `UsefulType` (`UTCTime`, `GeneralizedTime`, `ObjectDescriptor`)
 * - `UsefulObjectClassReference` (`TYPE-IDENTIFIER`, `ABSTRACT-SYNTAX`) as
 *   the start of `ObjectClassFieldType`
 */
export const TYPE_KEYWORD_FIRST: ReadonlySet<string> = new Set<string>([
  ProductionType._BIT,
  ProductionType._BOOLEAN,
  ProductionType._CHARACTER,
  ...RESTRICTED_CHARACTER_STRING_TYPES,
  ProductionType._CHOICE,
  ProductionType._DATE,
  ProductionType._DATE_TIME,
  ProductionType._DURATION,
  ProductionType._EMBEDDED,
  ProductionType._ENUMERATED,
  ProductionType._EXTERNAL,
  ProductionType._INSTANCE,
  ProductionType._INTEGER,
  ProductionType._OID_IRI,
  ProductionType._NULL,
  ProductionType._OBJECT,
  ProductionType._OCTET,
  ProductionType._REAL,
  ProductionType._RELATIVE_OID,
  ProductionType._RELATIVE_OID_IRI,
  ProductionType._SEQUENCE,
  ProductionType._SET,
  ProductionType._TIME,
  ProductionType._TIME_OF_DAY,
  ProductionType._ANY,
  ProductionType._UTCTime,
  ProductionType._GeneralizedTime,
  ProductionType._ObjectDescriptor,
  ProductionType._TYPE_IDENTIFIER,
  ProductionType._ABSTRACT_SYNTAX,
]);

/**
 * @summary Advance past whitespace tokens.
 * @param tokens The lexeme stream.
 * @param index The index to start from.
 * @returns The first non-whitespace index, or `tokens.length`.
 */
export function skipWhitespaceIndex(
  tokens: Production[],
  index: number
): number {
  while (index < tokens.length) {
    const type = tokens[index].type;
    if (
      type !== ProductionType.newlineWhitespace &&
      type !== ProductionType.nonNewlineWhitespace
    ) {
      return index;
    }
    index++;
  }
  return index;
}

/**
 * @summary Type of the token after the current one, skipping whitespace.
 */
export function peekNextNonWhitespaceType(
  state: ParseContext
): ProductionType | undefined {
  const i = skipWhitespaceIndex(state.tokens, state.index + 1);
  return state.tokens[i]?.type as ProductionType | undefined;
}

/**
 * @summary Cheap failed parse, matching `choiceOf`'s failure shape.
 */
export function failParse(
  state: ParseContext,
  containingType: ProductionType = ProductionType.empty
): ParseContext {
  const currentloc = state.tokens[state.index]?.location;
  return {
    ...state,
    error: true,
    cst: new Production(
      containingType,
      [],
      currentloc
        ? {
            ...currentloc,
            endIndex: currentloc.startIndex,
          }
        : undefined
    ),
  };
}

/**
 * @summary Whether `TypeWithConstraint` can match at `state.index`.
 * @description
 * `TypeWithConstraint` is `SET`/`SEQUENCE` followed by `SIZE` or `(` then
 * `OF`. `SEQUENCE {` and `SEQUENCE OF` are `SequenceType` / `SequenceOfType`
 * and must not take this path.
 *
 * Gating here is cheaper than shrinking `Constraint` inside
 * `TypeWithConstraint`: that production has both `SIZE Constraint` and
 * parenthesized `Constraint` (`SEQUENCE (SIZE (1..MAX)) OF`), so the
 * `Constraint` alternative cannot be dropped. The expensive case was
 * `SEQUENCE {` / `SEQUENCE OF`, which this predicate already skips.
 */
export function isTypeWithConstraintStart(state: ParseContext): boolean {
  const t0 = state.tokens[state.index]?.type;
  if (t0 !== ProductionType._SET && t0 !== ProductionType._SEQUENCE) {
    return false;
  }
  const next = peekNextNonWhitespaceType(state);
  return (
    next === ProductionType._SIZE ||
    next === ProductionType.parenthesisOpening
  );
}

/**
 * @summary Whether the current token can begin a `Type`.
 */
export function canStartType(state: ParseContext): boolean {
  const t0 = state.tokens[state.index]?.type;
  if (!t0) {
    return false;
  }
  // BuiltinType / UsefulType keywords, TYPE-IDENTIFIER, ABSTRACT-SYNTAX.
  if (TYPE_KEYWORD_FIRST.has(t0)) {
    return true;
  }
  // PrefixedType ::= TaggedType | EncodingPrefixedType, both start with "[".
  if (t0 === ProductionType.squareOpening) {
    return true;
  }
  // DefinedType, ParameterizedType, ExternalTypeReference,
  // ObjectClassFieldType, TypeFromObject (objectsetreference).
  if (
    t0 === ProductionType.typereference ||
    t0 === ProductionType.objectclassreference
  ) {
    return true;
  }
  if (t0 === ProductionType.identifier) {
    const next = peekNextNonWhitespaceType(state);
    return (
      // SelectionType ::= identifier "<" Type
      next === ProductionType.lessThan ||
      // TypeFromObject ::= DefinedObject "." FieldName
      next === ProductionType.period ||
      // TypeFromObject via ParameterizedObject ::= DefinedObject "{" … "}"
      next === ProductionType.curlyOpening
    );
  }
  return false;
}

/**
 * @summary Whether `OpenTypeFieldVal` (`Type ":" Value`) is worth attempting.
 * @description
 * `Value` tries `ObjectClassFieldValue` first. Most values cannot start a
 * `Type` (`{`, numbers, `TRUE`, identifiers that are not selection types).
 * Even when the token is a type keyword, the next token must be able to
 * continue that type or be the `:` that separates the open-type value.
 */
export function canStartOpenTypeFieldVal(state: ParseContext): boolean {
  const t0 = state.tokens[state.index]?.type;
  if (!t0) {
    return false;
  }
  const next = peekNextNonWhitespaceType(state);

  if (t0 === ProductionType.identifier) {
    return (
      // SelectionType ::= identifier "<" Type
      next === ProductionType.lessThan ||
      // TypeFromObject ::= DefinedObject "." FieldName
      next === ProductionType.period ||
      // TypeFromObject via ParameterizedObject ::= DefinedObject "{" … "}"
      next === ProductionType.curlyOpening
    );
  }

  if (
    t0 === ProductionType.typereference ||
    t0 === ProductionType.objectclassreference
  ) {
    return (
      // ExternalTypeReference / ObjectClassFieldType: "M.T" / "CLASS.&field"
      next === ProductionType.period ||
      // ParameterizedType ::= SimpleDefinedType "{" ActualParameterList "}"
      next === ProductionType.curlyOpening ||
      // ConstrainedType ::= Type Constraint, Constraint starts with "("
      next === ProductionType.parenthesisOpening ||
      // OpenTypeFieldVal ::= Type ":" Value
      next === ProductionType.colon
    );
  }

  // PrefixedType ::= "[" … "]" Type, then possibly ":" Value.
  if (t0 === ProductionType.squareOpening) {
    return true;
  }

  if (!TYPE_KEYWORD_FIRST.has(t0)) {
    return false;
  }

  // OpenTypeFieldVal ::= Type ":" Value, or ConstrainedType then ":".
  if (
    next === ProductionType.colon ||
    next === ProductionType.parenthesisOpening
  ) {
    return true;
  }

  switch (t0) {
    // IntegerType ::= INTEGER "{" NamedNumberList "}"
    case ProductionType._INTEGER:
      return next === ProductionType.curlyOpening;
    // BitStringType ::= BIT STRING [ "{" NamedBitList "}" ]
    case ProductionType._BIT:
      return next === ProductionType._STRING;
    // SequenceType / SetType / SequenceOfType / SetOfType / TypeWithConstraint
    case ProductionType._SEQUENCE:
    case ProductionType._SET:
      return (
        next === ProductionType.curlyOpening ||
        next === ProductionType._OF ||
        next === ProductionType._SIZE
      );
    // OctetStringType ::= OCTET STRING
    // UnrestrictedCharacterStringType ::= CHARACTER STRING
    case ProductionType._OCTET:
    case ProductionType._CHARACTER:
      return next === ProductionType._STRING;
    // ObjectIdentifierType ::= OBJECT IDENTIFIER
    case ProductionType._OBJECT:
      return next === ProductionType._IDENTIFIER;
    // InstanceOfType ::= INSTANCE OF DefinedObjectClass
    case ProductionType._INSTANCE:
      return next === ProductionType._OF;
    // EmbeddedPDVType ::= EMBEDDED PDV
    case ProductionType._EMBEDDED:
      return next === ProductionType._PDV;
    // EnumeratedType ::= ENUMERATED "{" Enumerations "}"
    // ChoiceType ::= CHOICE "{" AlternativeTypeLists "}"
    case ProductionType._ENUMERATED:
    case ProductionType._CHOICE:
      return next === ProductionType.curlyOpening;
    // ObjectClassFieldType starting at UsefulObjectClassReference "." FieldName
    case ProductionType._TYPE_IDENTIFIER:
    case ProductionType._ABSTRACT_SYNTAX:
      return next === ProductionType.period;
    default:
      return false;
  }
}
