# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- **BREAKING** Groking an object set no longer crashes when `EXCEPT` or another
  element position contains a parenthesized element set, such as
  `EXCEPT (referral | in-DSAReferral)`. The parenthesized set is kept in the
  abstract syntax tree.
- **BREAKING**: Make `ProductionType` an erasable union of constant strings.
  This might not actually break your code, depending on what you're doing.
- **BREAKING**: Replace the remaining enums (`AssignmentType`, `FieldSpecType`,
  `TaggingMode`, `TypeType`, `ValueType`, `ValueAssignmentType`,
  `SelectionOption`, `LogLevel`, and `ASN1UniversalType`) with const objects
  and unions, and enable `erasableSyntaxOnly`. Member values are unchanged, and
  each type is the union of those values, so a matching string or number
  literal is assignable where the old enum member type was required.
  `LogLevel` and `ASN1UniversalType` no longer have numeric-enum reverse
  mappings. `ASN1UniversalType.boolean` is still the value `1`; use
  `typeof ASN1UniversalType.boolean` when that member is needed as a type.
  Constructor parameters that previously declared properties are now ordinary
  fields assigned in the constructor.

## [2.7.3]

- Reject an absolute `OBJECT IDENTIFIER` whose first arc uses a name that is
  not a recognized root arc name for that number (`itu-t` / `ccitt` for 0,
  `iso` for 1, `joint-iso-itu-t` / `joint-iso-ccitt` for 2). A single arc
  numbered 0, 1, or 2 was previously accepted, so `{ pkiAttributeType(2) }`
  was not reported; that form is now an error suggesting the prefix notation
  `{ pkiAttributeType 2 }`.
- Fix `RELATIVE-OID` parsing
- Report nameless CHOICE alternatives and SET or SEQUENCE components (ancient
  ASN.1 syntax that X.680 no longer allows) as a syntax error instead of
  crashing with `TypeError: Cannot read properties of undefined (reading 'type')`.
- More descriptive error when encountering a totally empty object set `{ }`.
  (Not valid syntax, but `{...}` is.)
- Merge imports from the same module
  - Even though this is invalid, the way to handle this is still obvious.
- Slightly better (but still incorrect) symbol resolution in `resolve()`
- Handle whitespace in between parameterized imported references

## [2.7.2] - 2026-09-11

- Fix re-parsing of `Setting`s that are `typereference`s as `ValueSet`s.

## [2.7.1]

- Fix parsing of time type value assignments.

## [2.7.0]

This release introduces over a dozen bug fixes, including some
denial-of-service vulnerabilities, and approximately triples or quadruples the
performance of parsing! There's also now a CLI too for parsing ASN.1.

### Added

- `asn1parser` CLI: `lex`, `cst`, `ast`, and `check` subcommands that
  concatenate ASN.1 files and print JSON (or `ok`) to stdout or `-o` /
  `--output`. Pretty-print with `-p` / `--pretty`.

### Fixed

- Grok `SEQUENCE` and `SET` types whose component list starts with an extension
  marker (`...`). Groking previously crashed with
  `TypeError: Cannot read properties of undefined`.
- Parse a parameterized `DefinedType` (for example
  `CAMEL-AChBillingChargingCharacteristics {bound}`) as a
  `UserDefinedConstraintParameter` inside `CONSTRAINED BY { ... }`. The parser
  previously accepted the type reference as a bare object-set or object-class
  name and left the parameter list unconsumed.
- Report empty value-set assignments (`Foo Type ::= { }` and
  `Foo Type ::= { ... }`) with a descriptive syntax error. These previously
  failed the assignment and surfaced as a generic missing `END`.
- Report correct line and column numbers after tokens that contain newlines
  (block comments, character strings, and bit/hex strings). Substring re-lexing
  via `startloc` now keeps columns in substring-relative coordinates.
- Throw `ASN1SyntaxError` for an unterminated `cstring` instead of hanging.
- Emit a `SYNTAX_ERROR` token for unrecognized characters instead of swallowing
  them into the next token or spinning until the infinite-loop guard. `parse()`
  records these in `syntaxErrors` and continues with the rest of the module.
- Lex `realnumber` forms with an exponent and no decimal point (`1e10`, `1E-5`).
  These previously split into a `number` and an identifier.
- Nest `/* */` block comments per X.680, and do not treat the `*` in the opener
  as the start of a closer (`/*/` is not a closed comment).
- Do not close a `--` comment by overlapping the opener, so `---` is not treated
  as a finished comment.
- Emit a `SYNTAX_ERROR` for numbers with leading zeros (`0123`), matching X.680
  12.8. Bare `0` and realnumbers such as `0.5` and `0e10` are unchanged.
- Lex lowercase `true` and `false` as XML boolean keywords
  (`ProductionType._true` / `_false`) so `EmptyElementBoolean` (`<true/>`,
  `<false/>`) parses correctly.
- Allow NBSP (`U+00A0`) inside `bstring` and `hstring`, matching X.680
  white-space.
- Fail `anythingUntil` when its terminator never appears, instead of treating
  end of input as a successful match. Encoding instructions that never see `]`
  (or `END` / `ENCODING-CONTROL`) are now parse failures. `assert` recovery
  still skips to end of input and records a syntax error when the recovery token
  is missing.
- Parse `{ ... }` `BuiltinValue` alternatives according to `currentType` when it
  is known, and include `SetValue` / `SetOfValue` in the untyped `{` fallback.
  Without a type, `{}` was a `BitStringValue` and `{ a 1 }` was an
  `ObjectIdentifierValue`, so SEQUENCE/SET value assignments were misidentified.
- Handle maliciously recursive inputs.
- `DefinitiveOID`, when groked, had whitespace remaining in `name` for OID arcs
  that used a name and number (e.g. `asdf(4)`).

### Changed

- Dispatch `BuiltinType`, `ReferencedType`, `BuiltinValue`,
  `CharacterStringType`, and related choices on the current token type
  (FIRST-set gating) so doomed alternatives are not executed.
  `TypeWithConstraint` and `OpenTypeFieldVal` are skipped unless the following
  token can start those productions.
- Packrat-memoize expensive singleton parsers (`recursiveParser`, `whitespace`,
  `Setting`) by parser identity, token index, and semantic context so
  backtracking does not re-run the same production. `recursiveParser` now
  resolves its getter once so inner combinators keep a stable identity.
- Use `String.prototype.startsWith` for lexer delimiter prefix checks so
  comments, colons, and slashes are not O(n²) on large inputs.

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

[2.7.0]: https://github.com/Wildboar-Software/asn1parser/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/Wildboar-Software/asn1parser/compare/v2.5.1...v2.6.0
[2.5.1]: https://github.com/Wildboar-Software/asn1parser/compare/v2.5.0...v2.5.1
[2.5.0]: https://github.com/Wildboar-Software/asn1parser/compare/v2.4.1...v2.5.0
