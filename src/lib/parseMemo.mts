import type ParseContext from './interfaces/ParseContext.mjs';
import type Production from './Production.mjs';
import type TypeType from './constructs/TypeType.mjs';

/**
 * @summary Cached result of one parser at one token index under one context.
 */
export interface MemoEntry {
  error: boolean | undefined;
  index: number;
  cst: Production;
  currentType: TypeType | undefined;
  justParsedPluralLiteral: boolean | undefined;
}

/**
 * @summary Per-parse packrat table: parser instance → start index → fingerprint → entry.
 * @description
 * Parser instances that are module-level singletons (or resolved once by
 * `recursiveParser`) share identity across backtracking, which is what makes
 * hits possible. The table is attached to `ParseContext` so it is shared by
 * every `{...state}` copy, then dropped when `Parser.start` returns so failed
 * CSTs are not retained on the result.
 */
export type ParseMemo = WeakMap<object, Map<number, Map<number, MemoEntry>>>;

const TYPE_CODE: Map<string, number> = new Map();

/**
 * Pack semantic context into a 53-bit integer:
 * `currentType` (8), plural flag (1), identifier count (16),
 * defined-syntax-token count (12), enum-item count (12).
 * Returns `undefined` when a count does not fit, in which case that attempt
 * is not memoized.
 */
export function memoFingerprint(state: ParseContext): number | undefined {
  const idCount = state.discoveredIdentifiers.size;
  const syntaxTokenCount = state.definedSyntaxTokens.size;
  const enumCount = state.definedEnumItems.size;
  if (idCount > 0xffff || syntaxTokenCount > 0xfff || enumCount > 0xfff) {
    return undefined;
  }
  let typeCode = 0;
  const currentType = state.currentType;
  if (currentType !== undefined) {
    const existing = TYPE_CODE.get(currentType);
    if (existing === undefined) {
      typeCode = TYPE_CODE.size + 1;
      if (typeCode > 0xff) {
        return undefined;
      }
      TYPE_CODE.set(currentType, typeCode);
    } else {
      typeCode = existing;
    }
  }
  // Use addition, not `|` / `<<`: bitwise operators in JS are 32-bit, and
  // the syntax-token / enum-item fields sit above bit 32.
  return (
    typeCode +
    (state.justParsedPluralLiteral ? 256 : 0) +
    idCount * 512 +
    syntaxTokenCount * 33554432 +
    enumCount * 137438953472
  );
}

/**
 * @summary Create an empty packrat table for one `Parser.start` invocation.
 * @returns {ParseMemo} A new memo table.
 */
export function createParseMemo(): ParseMemo {
  return new WeakMap();
}

/**
 * @summary Return a cached parse result if one exists for this attempt.
 * @description
 * The returned context is a shallow copy of `state` with the cached
 * `index` / `cst` / `error` / type flags overlaid. Callers such as
 * `optional()` mutate the returned object (`delete result.error`); copying
 * keeps the table entry intact.
 *
 * @param {object} parser The parser instance (`this` in `execute`).
 * @param {ParseContext} state The incoming parser state.
 * @param {number} fingerprint Context captured before `executor`.
 * @returns {ParseContext | undefined} A reconstructed state on hit.
 */
export function lookupMemo(
  parser: object,
  state: ParseContext,
  fingerprint: number
): ParseContext | undefined {
  const table = state.memo;
  if (!table) {
    return undefined;
  }
  const entry = table.get(parser)?.get(state.index)?.get(fingerprint);
  if (!entry) {
    return undefined;
  }
  return {
    ...state,
    error: entry.error,
    index: entry.index,
    cst: entry.cst,
    currentType: entry.currentType,
    justParsedPluralLiteral: entry.justParsedPluralLiteral,
  };
}

/**
 * @summary Store the result of a parser attempt for later backtracking.
 * @param {object} parser The parser instance (`this` in `execute`).
 * @param {ParseContext} state The incoming parser state (provides `memo`).
 * @param {number} startIndex Token index at which the parser began.
 * @param {number} fingerprint Context captured before `executor`.
 * @param {ParseContext} result The state returned by `executor` / callbacks.
 */
export function storeMemo(
  parser: object,
  state: ParseContext,
  startIndex: number,
  fingerprint: number,
  result: ParseContext
): void {
  const table = state.memo;
  if (!table) {
    return;
  }
  let byIndex = table.get(parser);
  if (!byIndex) {
    byIndex = new Map();
    table.set(parser, byIndex);
  }
  let byFp = byIndex.get(startIndex);
  if (!byFp) {
    byFp = new Map();
    byIndex.set(startIndex, byFp);
  }
  if (byFp.has(fingerprint)) {
    return;
  }
  byFp.set(fingerprint, {
    error: result.error,
    index: result.index,
    cst: result.cst,
    currentType: result.currentType,
    justParsedPluralLiteral: result.justParsedPluralLiteral,
  });
}
