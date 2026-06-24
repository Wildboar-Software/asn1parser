# ASN.1 Parser

[![JSR](https://jsr.io/badges/@wildboar/asn1-parser)](https://jsr.io/@wildboar/asn1-parser)

ASN.1 text parser in TypeScript. To clarify: this is not a Basic Encoding
Rules (BER), Distinguished Encoding Rules (DER) encoder / decoder, etc.
If you are attempting to serialize or deserialize ASN.1 data, this is not
the correct module for your purposes. This module parses the textual ASN.1
specifications themselves, according to the syntax defined in the freely
available ITU-T Recommendations
[X.680](https://www.itu.int/rec/T-REC-X.680/en),
[X.681](https://www.itu.int/rec/T-REC-X.681/en),
[X.682](https://www.itu.int/rec/T-REC-X.682/en),
and [X.683](https://www.itu.int/rec/T-REC-X.683/en).

## Documentation

- [Usage](./doc/usage.md)
- [Compatibility with Old ASN.1 Features](./doc/backwards-compatibility.md)
- [Phases of Compilation](./doc/phases.md)
- [Terminology Used by this Module](./doc/terminology.md)
- [Design Mistakes](./doc/design-mistakes.md)

## Usage Example

This is a test, completely copied and pasted here to showcase the capabilies
and usage of this module:

```javascript
import { strict as assert, strictEqual as assertEquals } from 'node:assert';
import { lex, grok, normalize, parse, correct, AssignmentType, TypeType } from '../dist/index.mjs';
import { test } from 'node:test';

const AuthenticationFramework = `
AuthenticationFramework {joint-iso-itu-t ds(5) module(1) authenticationFramework(7) 8}
DEFINITIONS ::= BEGIN

-- EXPORTS All

IMPORTS

  ATTRIBUTE, DistinguishedName, MATCHING-RULE, Name, NAME-FORM, OBJECT-CLASS,
  RelativeDistinguishedName, SYNTAX-NAME, top
    FROM InformationFramework informationFramework ;

SIGNATURE ::= SEQUENCE {
  algorithmIdentifier  AlgorithmIdentifier{{SupportedAlgorithms}},
  signature            BIT STRING,
  ... }

SIGNED{ToBeSigned} ::= SEQUENCE {
  toBeSigned    ToBeSigned,
  COMPONENTS OF SIGNATURE,
  ... }
  
END`;

test('the README example works', () => {
  const text = AuthenticationFramework;
  const lexResults = Array.from(lex(text));
  const parseResults = parse(text, lexResults);
  const modules = grok(text, parseResults);
  const normalizedModules = normalize(modules);
  correct(normalizedModules);
  const afmod = normalizedModules[0];
  assertEquals(afmod.name, 'AuthenticationFramework');
  const sig = afmod.assignments.SIGNATURE;
  assert(sig.assignmentType === AssignmentType.TypeAssignment);
  assert(afmod.assignments.SIGNATURE.type.typeType === TypeType.SequenceType);
  /** @type {import('../dist/index.mjs').SetOrSequenceType} */
  const seq = afmod.assignments.SIGNATURE.type.type;
  assertEquals(seq.rootComponentTypeList1.length, 2);
  const [ comp1, comp2 ] = seq.rootComponentTypeList1 ?? [];

  assertEquals(comp1.namedType.identifier, 'algorithmIdentifier');
  assertEquals(comp1.namedType.type.typeType, TypeType.DefinedType);
  assertEquals(comp1.namedType.type.type.reference, 'AlgorithmIdentifier');
  assertEquals(comp1.optional, false);
  assertEquals(comp1.text, 'algorithmIdentifier  AlgorithmIdentifier{{SupportedAlgorithms}}');
  assertEquals(comp1.default, undefined);
  // The offset of the start of this component in characters into the original text.
  assertEquals(comp1.production.location.startIndex, 341);
  // The offset of the end of this component in characters into the original text.
  assertEquals(comp1.production.location.endIndex, 341 + 63);

  assertEquals(comp2.namedType.identifier, 'signature');
  assertEquals(comp2.namedType.type.typeType, TypeType.BitStringType);
  assertEquals(comp2.optional, false);
  assertEquals(comp2.text, 'signature            BIT STRING');
  assertEquals(comp2.default, undefined);
});
```

### Parsing and Groking Individual Productions

You don't have to parse or grok entire files at a time. You can parse
individual productions, too! All of the "sub-parsers" and grokers are
exported via `parserFor` and `grokerFor`.

```typescript
import { strictEqual as assertEquals } from 'node:assert';
import { grokerFor, parserFor } from '@wildboar/asn1-parser';

const text = "MyType ::= INTEGER";
const ps = parserFor.TypeAssignment.start(tokens, text);
const ctx = createGrokContext(text, ps.definedEnumItems);
const ta = grokerFor.TypeAssignment(ps.cst, ctx);
assertEquals(ta.identifier, "MyType");
```

If you are re-parsing a substring of the entire ASN.1 file:

- Supply a `Location` object to the `startloc` parameter of
  `lex(text, startloc)`, which will add that location's
  `startIndex` to the start and end offsets of all lexical
  tokens (`Production`s). It will also adjust the line and
  column number. That way, the offsets for those tokens
  correctly point to their offsets in the original text, not
  the substring you re-lexed.
- In the `GrokContext`, set `textStartsAtOffset` to the same
  `startIndex` of the `Location` you used for `startloc` in
  `lex()`. This is needed because the groking functions take
  the substring, not the whole string, so you have to "undo"
  the offset correction you did in `lex()`.

Sorry this API is so dumb. I have never written a lexer / parser before this,
and I originally had no intention or even thoughts about this being able to
support parsing substrings of ASN.1. This is so janky because I had to not
break compatibility.

I would also caution you that substring parsing is not very deeply tested.

### Error Handling

In addition to the built-in error subclasses, `Error` and `SyntaxError`, this
package also throws three custom error classes:

- `ASN1SyntaxError`: thrown when there is an objective syntax error
- `ASN1SemanticError`: thrown when there is a semantic error, such as a
  mismatching type and value, or a type reference referring to an object
  class assignment instead of a type assignment.
- `ASN1ParserExpectationError`: thrown when the lexer / parser / groker
  encounters some unexpected state. Think of it as an assertion failure.
  If this happens, it might be a bug. Please let me know about it!

Each of these can be associated with a `Production` via their `production`
field. Since the `Production` has a `location` field, you can use this to
ascribe a location in the document to the error. `ASN1SemanticError` and
`ASN1ParserExpectationError` can also have associated module names and
assignment identifiers.

### XML Value Assignments

This module theoretically supports reading XML value assignments, but this was
never tested at all. It is very plausible that it works poorly, if at all.

## Module System and Environment

This module is published as an ESM module exclusively. If you are still using
CommonJS, it is time to get with the times and switch to ESM. This module is
published on both [npmjs.com](https://www.npmjs.com/) and
[jsr.io](https://jsr.io/@wildboar/asn1-parser).

This module is intentionally run-time agnostic. It works on
[Node.js](https://nodejs.org/), [Deno](https://deno.com/),
[Bun](https://bun.sh/), and it probably would work on
[QuickJS](https://quickjs-ng.github.io/quickjs/) and in any browser.

This module has a single run-time dependency, which itself has no further
dependencies.

## Building

You can build this library by running `npm run build`.
The outputs will all be in `dist`. `dist/index.mjs` is the entry point where
all of the symbols that constitute the public API are exported.

## Testing

If you have Node.js installed, you can test using `npm run node-test`. To test
with [Bun](https://bun.sh/), use `npm run bun-test`. To test with
[Deno](https://deno.com/), use `npm run deno-test`. There is only one Deno
test, whose purpose is to kind of "smoke test" that this works on Deno.

You can check if this module has any problems with JSR by running
`npx jsr publish --dry-run --allow-dirty`.

## AI / LLM Usage Statement

None of the code in this repository was written AI / LLMs, except a few tests
that were previously written run using Jest were converted to using the
built-in NodeJS test runner, and Cursor was used to add some missing type
annotations.

## See Also

- [Meerkat DSA](https://wildboar-software.github.io/directory/), an X.500
  directory server that uses ASN.1 that was compiled to TypeScript using
  this module.
* [ASN.1: Communication Between Heterogeneous Systems](https://www.oss.com/asn1/resources/books-whitepapers-pubs/dubuisson-asn1-book.PDF) by Olivier Dubuisson

## To Do

- [ ] Performance Enhancements
- [ ] Make dependency on `dependency-graph` optional
