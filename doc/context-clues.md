# Context Clues

When parsing ASN.1, you can infer some things based on context. These can be
useful for lexing, parsing, groking, normalization, or all of the above.

- An identifier that comes after `COMPONENTS OF` is a `SET` or `SEQUENCE`.
- A selection type always refers to a `CHOICE` type.
- A `DefinedValue` used in a tag refers to an `INTEGER` type.
- A `DefinedValue` used in an `OBJECT IDENTIFIER` refers to another `OBJECT IDENTIFIER`
