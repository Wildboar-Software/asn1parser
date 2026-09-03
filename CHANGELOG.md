# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Grok `SEQUENCE` and `SET` types whose component list starts with an extension marker (`...`). Groking previously crashed with `TypeError: Cannot read properties of undefined`.
- Parse a parameterized `DefinedType` (for example `CAMEL-AChBillingChargingCharacteristics {bound}`) as a `UserDefinedConstraintParameter` inside `CONSTRAINED BY { ... }`. The parser previously accepted the type reference as a bare object-set or object-class name and left the parameter list unconsumed.
- Report empty value-set assignments (`Foo Type ::= { }` and `Foo Type ::= { ... }`) with a descriptive syntax error. These previously failed the assignment and surfaced as a generic missing `END`.
- Report correct line and column numbers after tokens that contain newlines (block comments, character strings, and bit/hex strings). Substring re-lexing via `startloc` now keeps columns in substring-relative coordinates.
- Throw `ASN1SyntaxError` for an unterminated `cstring` instead of hanging.
- Emit a `SYNTAX_ERROR` token for unrecognized characters instead of swallowing them into the next token or spinning until the infinite-loop guard. `parse()` records these in `syntaxErrors` and continues with the rest of the module.
- Lex `realnumber` forms with an exponent and no decimal point (`1e10`, `1E-5`). These previously split into a `number` and an identifier.
- Nest `/* */` block comments per X.680, and do not treat the `*` in the opener as the start of a closer (`/*/` is not a closed comment).
- Do not close a `--` comment by overlapping the opener, so `---` is not treated as a finished comment.
- Emit a `SYNTAX_ERROR` for numbers with leading zeros (`0123`), matching X.680 12.8. Bare `0` and realnumbers such as `0.5` and `0e10` are unchanged.
- Lex lowercase `true` and `false` as XML boolean keywords (`ProductionType._true` / `_false`) so `EmptyElementBoolean` (`<true/>`, `<false/>`) parses correctly.
- Allow NBSP (`U+00A0`) inside `bstring` and `hstring`, matching X.680 white-space.
- Fail `anythingUntil` when its terminator never appears, instead of treating end of input as a successful match. Encoding instructions that never see `]` (or `END` / `ENCODING-CONTROL`) are now parse failures. `assert` recovery still skips to end of input and records a syntax error when the recovery token is missing.
- Parse `{ ... }` `BuiltinValue` alternatives according to `currentType` when it is known, and include `SetValue` / `SetOfValue` in the untyped `{` fallback. Without a type, `{}` was a `BitStringValue` and `{ a 1 }` was an `ObjectIdentifierValue`, so SEQUENCE/SET value assignments were misidentified.

### Changed

- Dispatch `BuiltinType`, `ReferencedType`, `BuiltinValue`, `CharacterStringType`, and related choices on the current token type (FIRST-set gating) so doomed alternatives are not executed. `TypeWithConstraint` and `OpenTypeFieldVal` are skipped unless the following token can start those productions.
- Packrat-memoize expensive singleton parsers (`recursiveParser`, `whitespace`, `Setting`) by parser identity, token index, and semantic context so backtracking does not re-run the same production. `recursiveParser` now resolves its getter once so inner combinators keep a stable identity.
- Use `String.prototype.startsWith` for lexer delimiter prefix checks so comments, colons, and slashes are not O(n²) on large inputs.

## [2.6.0] - 2026-07-12

### Added

- `defaultSyntax` field on `ObjectAssignment` for caching translation to default syntax.
- `originalIndex` on `Assignment`.

### Changed

- More JSDoc, particularly on `Assignment`.

## [2.5.1] - 2026-07-06

### Fixed

- Discern between `DefinedValue` and `NameForm` when parsing an `ObjectIdentifierValue` that features a prefix.
- Export missing `ProductionType`-related types.
- Include `SymbolsFromModule` in the order in which they are imported (so duplicates can be detected).

## [2.5.0] - 2026-07-03

### Added

- `getLength()` on `Production`.
- `asn1ModuleOidMatch()` for matching a reference to an imported module to the module's object identifier.
- `isDefinedOrImported()` for checking whether a symbol is defined or imported within a given module.

### Fixed

- Invalid reparsing in `correct()`.
- Parse parameterized values that appear within object identifier values.
- Better typing for `lex()`.

### Changed

- NPM provenance, which you can read about [here](https://docs.npmjs.com/generating-provenance-statements#about-npm-provenance).

[Unreleased]: https://github.com/Wildboar-Software/asn1parser/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/Wildboar-Software/asn1parser/compare/v2.5.1...v2.6.0
[2.5.1]: https://github.com/Wildboar-Software/asn1parser/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/Wildboar-Software/asn1parser/compare/v2.4.1...v2.5.0
