# Design Mistakes

1. Using the term `ast` when I should have used `cst`.
2. Not supporting the identification of multiple possible productions.

- In other words, when encountering a `choiceOf`, iterating over all of the
  possibilities, and emitting all of those that work, rather than just the
  first one. Obviously, this would have a very adverse performance impact, but
  nothing would ever be mis-identified.

3. Do **NOT** use classes to identify object types, because the class name is
   lost when the class is converted to JSON. You MUST use a `type` field.

## Lex

Lexing should return comment ranges and string ranges. This would make it
easier for tooling to determine which ranges can be ignored for searches and
other things like that. The VS code extension sure could have benefitted from
this.

Lexing also does not support failures very well. By throwing an error, I cannot
get the lexical tokens up until the problem appears.