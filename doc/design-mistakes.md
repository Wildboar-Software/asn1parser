# Design Mistakes

1. Using the term `ast` when I should have used `cst`.
2. Not supporting the identification of multiple possible productions.

- In other words, when encountering a `choiceOf`, iterating over all of the
  possibilities, and emitting all of those that work, rather than just the
  first one. Obviously, this would have a very adverse performance impact, but
  nothing would ever be mis-identified.

3. Do **NOT** use classes to identify object types, because the class name is
   lost when the class is converted to JSON. You MUST use a `type` field.
