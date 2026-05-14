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
built-in NodeJS test runner.

## See Also

- [Meerkat DSA](https://wildboar-software.github.io/directory/), an X.500
  directory server that uses ASN.1 that was compiled to TypeScript using
  this module.
* [ASN.1: Communication Between Heterogeneous Systems](https://www.oss.com/asn1/resources/books-whitepapers-pubs/dubuisson-asn1-book.PDF) by Olivier Dubuisson

## To Do

- [ ] Performance Enhancements
- [ ] Make dependency on `dependency-graph` optional
- [x] GitHub Actions
- [x] Publish
