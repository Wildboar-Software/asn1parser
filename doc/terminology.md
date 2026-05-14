# Terminology

This library uses some _creative_ terminology at times, so I felt that a lexicon
would be handy. If you hear other terms throughout this library that are not
listed here but you do not know them, pick up a book on compilers and read that.
This documentation is only to document some of my own neologisms introduced into
this library as well as append contextual information, where applicable.

## Terms

### Grok

To convert the Concret Syntax Tree (CST) into an Abstract Syntax Tree (AST).
This is not a standard term at all; this is one I defined for private usage in
this library.

### Context

An object passed between functions in this library that can serve as a
"backbone" for functions to communicate as well as a singular site for
dependencies to be injected. In this library, all contexts include a
`log` member that can be used to generate log messages, for example.

### Production

A context-free grammer (CFG). A production defines a new syntactic type in the
form of an equation. Usually, this is represented in Augmented Backus-Naur Form
(ABNF), like so: `A ::= B C D`.

In this library, `Production` is a class whose `children` correspond to the
right-hand side of the assignment. The `type` of this `Production` is given by
the left-hand side of the assignment.

### Lexeme

A product of lexing. A single syntactic _atom_. In this library, a lexeme is
represented as a `Production`, just like nodes of the concrete syntax tree
(CST), however, its `type` may only take on values of `TerminalProductionType`.

### Token

This is a synonym of `Lexeme`.

### Construct

A term describing an abstract syntax tree (AST) node. In this library, ASN.1
nodes do not adhere to any particular type; in this library, AST nodes take on
forms that are representative of their semantic content. These forms are called
"constructs" by this library.

This differs from the concrete syntax tree (CST), where all nodes are instances
of the `Production` class.

A "construct" is the TypeScript type that represents an AST node for a given
production, such as a `TypeAssignment`.

### Normalize

This is a misleading term. It used to be accurate, but as I added more features
to the "normalization" phase of this library, it has ceased to be accurate.

### Correct

"Correction" is a phase of the front-end where errors made during parsing are
corrected. Errors can happen, because several ASN.1 productions are
indistinguishable syntactically, and can therefore only be corrected after
parsing gives the front-end enough contextual information to intelligently
correct these errors.

### Define-Before-Use

The rule that, before an assignment is referenced, it must be defined. Unlike
most programming languages, ASN.1 (which is an interface description language,
not a programming language) does not enforce define-before-use. This means that
the following ASN.1 is perfectly valid:

```asn1
age Age ::= 27
Age ::= INTEGER (0..100)
```

This is important for this library. The lack of define-before-use enforcement
means that the document must be parsed completely before references can be
resolved (assuming the ASN.1 is actually correct and all references are
defined somewhere), then the document must be analyzed in with a "second sweep"
that checks what those references refer to and correct any errors made as a
result of this lack of information.
