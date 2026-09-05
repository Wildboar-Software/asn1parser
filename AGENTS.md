# Instructions for Coding Agents

Run `npm ci` to install.

Run `npm run build` to build.

With NodeJS as the runtime, run `npm run node-test` to test.

When you change dependencies at all, always run `deno install --frozen=false` to
update the `deno.lock` file in the same commit.

Extra documentation is in `doc/`. `doc/all.bnf` contains the complete BNF
grammar for ASN.1; semi-colons start comments in this file.

This project builds, tests, and deploys from GitHub CI, and the resulting
package gets published to both `jsr.io` and `npmjs.com`. Whatever changes you
make MUST be compatible with NodeJS, Bun, and Deno.

Unit tests are in `test/` and they use the built-in NodeJS test runner.

`src/cli.mts` is the command line interface, which can be used for lexing,
parsing, and groking, producing JSON output with each of those. After you build,
you can run it directly using `node dist/cli.mjs`. See
`node dist/cli.mjs --help` to get acquainted.

Here is a summary of the source code layout:

- `src/lib/constructs`: data structures, interfaces, types
- `src/lib/correctors`: functions that apply retroactive fixes to ASN.1
  abstract syntax trees. Some ASN.1 grammar is ambiguous; correctors use
  the completely parsed AST to try to resolve these ambiguities.
- `src/lib/errors`: error classes
- `src/lib/grokers`: functions that convert the concrete syntax tree to
  an abstract syntax tree
- `src/lib/interfaces`: Typescript interfaces, intended for more generally
  useful interfaces that don't necessarily apply to ASN.1.
- `src/lib/loggers`: logging interfaces
- `src/lib/maps`: data mapping something to something else
- `src/lib/normalizers`: functions that transform the abstract syntax tree
  to make it easier for programs to generate code from it, for example.
  Code for "un-nesting" constructed types defined within other constructed
  types, transforming defined syntax to default syntax in info objects,
  replicating `COMPONENTS OF` and more.
- `src/lib/parsers/callbacks`: functions invoked when certain grammatical
  productions are parsed
- `src/lib/parsers/deprecated`: deprecated parsers. Do not use in new code.
- `src/lib/parsers/generic`: "abstract" parsers, generally used to compose
  other parsers into choices and sequences, or other special parsers that
  are not necessarily ASN.1-related.
- `src/lib/parsers/optimized`: ASN.1-related parsers that deviate from the
  obvious parsing approach to achieve better performance.
- `src/lib/parsers/specific`: ASN.1-specific parsers
- `src/lib`: miscellaneous functions pile up in here.

Lexing is implemented in `src/lib/lex.mts`. Parsing is implemented in
`src/lib/parser.mts`. Groking is implemented in `src/lib/grok.mts`.
Correction is implemented in `src/lib/correct.mts`. Normalization is
implemented in `src/lib/normalize.mts`.

`Production` is a class that represents either a lexical token or a node
in a concrete syntax tree. It is basically just a node type and a span of the
original text. `Production` is defined in `src/lib/Production.mts`, and its
types are defined in `src/lib/ProductionType.mts`.

Within a set of ASTs, use `resolve()` or `recursivelyResolve()` to resolve
defined things, such as `commonName` to their assignment.
