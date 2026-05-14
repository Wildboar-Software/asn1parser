# Backwards Compatibility

Though it is deprecated, the `AnyType` production from ITU X.208 will still be
supported by this parser, but the `AnyValue` production will not.

Macros, as are defined in ITU X.208, will not be supported by this parser.

Whether used or not, parsers and grokers have been implemented for `AnyType` and
`AnyValue`. As of now, nothing will be implemented to support macros.

# ANY

`AnyType` is fully lexed, parsed, and groked. This parser has full backwards-compatible
support for `AnyType`.

`AnyValue`, on the other hand, is not supported in parsing, but all of the code
for groking it is already there, just deliberately unused. It is unused because
it is of little value, yet, because of how `AnyValue` is defined, it would be
very prone to introducing bugs into the parser if it were to be parsed.

# Macros

Macros are entirely unsupported by the parser, but macro-related keywords are
identified as such by the lexer.
