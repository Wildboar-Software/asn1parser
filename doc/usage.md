# Usage

This library exposes more than just these, but the most important exports are:

- `lex()`
- `parse()`
- `grok()`
- `correct()`
- `normalize()`

Look at their documentation for more information about them individually.

## Simple Example

```typescript
const text = `A {iso} DEFINITIONS ::= BEGIN
    SIGNED{ToBeSigned} ::= SEQUENCE {
        toBeSigned    ToBeSigned,
        COMPONENTS OF SIGNATURE,
        ... }
    END`;
const g = grok(text);
correct(g);
normalize(g);
```

At the end of the above TypeScript, the variable `g` contains a correct and
normalized AST representing the ASN.1. This output is ready for consumption by
a back-end library.

The produced output looks like this:

```
[
    Module {
        name: 'A',
        oid: [ [Object] ],
        iri: undefined,
        encodingReference: undefined,
        taggingMode: 'EXPLICIT',
        extensibilityImplied: false,
        imports: {},
        exports: undefined,
        assignments: { SIGNED: [Object] },
        asn1FilePath: undefined,
        comment: undefined,
        definedEnumItems: Set {}
    }
]
```

Notice that the above is an array of `Module`s--not just a single `Module`. This
library is designed to incorporate inter-related information from multiple
modules to produce correct abstract syntax trees.

The `assignments` member of the `Module` is of primary interest. That is where
most of the textual ASN.1 ends up. You will see in the `Module` above that there
is a single assignment, `SIGNED`, within `assignments`, which is correct.

Expanding upon `SIGNED`, we see this:

```
{
    identifier: 'SIGNED',
    assignmentType: 'TypeAssignment',
    leftHandSide: 'SIGNED{ToBeSigned} ',
    rightHandSide: ' SEQUENCE {\n' +
        '                toBeSigned    ToBeSigned,\n' +
        '                COMPONENTS OF SIGNATURE,\n' +
        '                ... }',
    type: {
        text: 'SEQUENCE {\n' +
            '                toBeSigned    ToBeSigned,\n' +
            '                COMPONENTS OF SIGNATURE,\n' +
            '                ... }',
        typeType: 'SequenceType',
        type: {
            rootComponentTypeList1: [Array],
            rootComponentTypeList2: undefined,
            extensionAdditionList: undefined,
            explicitlyExtensible: true,
            exception: undefined,
            hasSelfContainedRootComponentTypeList: false,
            hasOptionalRootComponentTypes: undefined
        }
    },
    parameters: [
        { dummyReference: 'ToBeSigned', assignmentType: 'TypeAssignment' }
    ],
    dependencies: {
        'A.SIGNATURE': {
            reference: 'SIGNATURE',
            computedModule: 'A',
            assignmentType: 'TypeAssignment',
            parameterIndex: undefined
        }
    },
    module: { name: 'A' },
    dependencyIndex: 0
}
```

The assignment contains an annotation of the module it came from so that it can
be more independent of the assignment. The assignment also preserves the
original textual representation of both sides of the assignment operator (`::=`)
as the `leftHandSide` and `rightHandSide` members, respectively.

The assignment has a `dependencyIndex`, which tells you the order in which this
assignment should appear in the final compiled code if the targeted programming
language has a define-before-use rule (hint: almost all of them do). This means
that, when you go to compile, you need to sort all of these assignments by this
number, in ascending order. This number is calculated by this library by using
the `dependencies` field, which contains all of the dependencies the library
identified in this assignment.

You will see a `parameters` member of the assignment, where parameters can be
found if the assignment is parameterized. This one is.

Other than the `identifier` and `assignmentType` members, the remaining fields
will differ between assignment types. `TypeAssignments` have a `type` field.
`ValueAssignments` have a `type` and a `value` field. `ObjectAssignments` have
`definedObjectClass` and `object` fields.

## Multiple Modules Example

Say that the following ASN.1 modules are strings, assigned to the variables
`moduleA` and `moduleB` respectively.

```asn1
A {iso} DEFINITIONS ::= BEGIN

    SIGNED{ToBeSigned} ::= SEQUENCE {
        toBeSigned    ToBeSigned,
        COMPONENTS OF SIGNATURE,
        ... }

END

B {iso} DEFINITIONS ::= BEGIN

    IMPORTS SIGNED FROM A {iso};

    SignedBits ::= SIGNED{BIT STRING}

END
```

We can `grok` them independently, because generation of the initial ASTs for
each module is independent of the other modules.

```typescript
const A = grok(moduleA);
const B = grok(moduleB);
correct([A, B]);
normalize([A, B]);
```

However, you could grok them together, like so:

```typescript
const g = grok(moduleA + '\r\n' + moduleB);
correct(g);
normalize(g);
```

## Phase Control Example

You can get more control over the front-end processes if you need it by
manually executing the individual phases:

```typescript
const text = `A {iso} DEFINITIONS ::= BEGIN
    SIGNED{ToBeSigned} ::= SEQUENCE {
        toBeSigned    ToBeSigned,
        COMPONENTS OF SIGNATURE,
        ... }
    END`;
const lex = Array.from(lex(text));
console.log(lex.length); // Prints the number of tokens lexed.
const p = parse(text, lex);
console.log(p); // Prints the ending parser state. "p.cst" contains the concrete syntax tree.
if (p.error) {
  // p.error indicates whether parsing failed.
  console.error('Oops!');

  // p.syntaxErrors contains a map of textual indices to syntax errors.
  Object.values(p.syntaxErrors).forEach((se) => {
    const loc = se.production.location;
    console.log(
      `Syntax error here @ ${loc.lineNumber}:${loc.columnNumber} (Index ${loc.startIndex})\r\n` +
        se.message
    );
  });

  process.exit(1);
}
const g = grok(text, p); // g is a _mostly_ correct array of `Module`s (ASTs).
correct(g); // This iterates through the modules, correcting any errors.
normalize(g); // This iterates through the modules, "normalizing" them. See `phases.md`.
```

You may notice in the above example, that we passed an extra argument to `grok`.
If you do not supply the outputs of the previous phase to `parse()` or `grok()`,
as the second argument, these functions will automatically take care of the
previous phases for you. Since we already parsed the ASN.1 modules in the above
example, we pass in the parse results as the second argument to `grok()` so that
it does not lex and parse them _again_.

## Back-end Example

This is a brief example of what it might look like to compile the ASN.1 AST to
the corresponding code. This will vary per targeted programming language, so
this example will be very abstract.

This ASN.1:

```asn1
A {iso} DEFINITIONS ::= BEGIN

val INTEGER ::= 5

END
```

Produces an assignment AST that looks like this:

```
{
  identifier: 'val',
  assignmentType: 'ValueAssignment',
  leftHandSide: 'val INTEGER ',
  rightHandSide: ' 5',
  type: {
    text: 'INTEGER',
    typeType: 'IntegerType',
    type: { selfContained: true }
  },
  value: { text: '5', valueType: 'IntegerValue', value: 5 },
  parameters: undefined,
  dependencies: {},
  module: { name: 'A' },
  dependencyIndex: 0
}
```

A back-end that would compile this to TypeScript might iterate over all
assignments in a module (after sorting by the `dependencyIndex`, of course),
generate the corresponding code for each, and concatenate them with newlines.

The code generated by the above example might look like this:

```typescript
export const val: INTEGER = 5;
```

Where `INTEGER` is defined before the above assignment.

## Doubly-Linking the CST

If given a Concrete Syntax Tree (CST) node and you need to discover the node
immediately superior to it, you must first call `doublyLinkCST()` over the
CST's root (or some node beneath it), so the parents of those nodes can be
associated. This is not done automatically because sometimes you do not need
it. Here is an example:

```typescript
const text = `A {iso} DEFINITIONS ::= BEGIN
    SIGNED{ToBeSigned} ::= SEQUENCE {
        toBeSigned    ToBeSigned,
        COMPONENTS OF SIGNATURE,
        ... }
    END`;
const lex = Array.from(lex(text));
const p = parse(text, lex);
// console.log(p); // Prints the ending parser state. "p.cst" contains the concrete syntax tree.
doublyLinkCST(p.cst);
// Now every node in the CST has the `.parent` property populated.
```