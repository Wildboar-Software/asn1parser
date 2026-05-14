# Common Problems with Parsing

Below is a list of the most common problems I came across with parsing.

## Whitespace optionality

When parsing a sequence with optional tokens only at the end, it is not
acceptable to make the whitespace that separates those tokens from the
mandatory part optional, because if those optional tokens cannot be read, the
sequence parsing will end with the optional whitespace having been digested
when it should not have.

## Subset Ordering

If a more general production comes before one that is a subset of it in a
`choiceOf` parser, the more general one will be chosen first.

As an example, if you parse an identifier, or an identifier followed by curly
brackets (in that order), the identifier will be read, and the `choiceOf` parser
will "give up" on looking further, meaning that it will never look for curly
brackets after the identifier. When the time comes for the parser to read the
next production, it will encounter those curly brackets that it failed to
digest from the previous production and fail to read what was expected.

This was one of the most nefarious problems, because you cannot follow the
specification exactly as it is written, and debugging this means that you
have to figure out what the parser sees as it is parsing.

## Incorrect Lexing

There were a few occassions in which the lexer was simply emitting the
wrong tokens, such as:

- Emitting a real number whenever an integer was adjacent to a period, as
  happens in the `ValueRange` production.
- Emitting `typeidentifier` when an `objectclassreference` was read.
- Emitting two adjacent square brackets as version brackets, even though there
  are circumstances where two square brackets will be adjacent without being
  version brackets.
- Checking for specific tokens using `indexOf` without the start position
  argument, which lead to specific tokens never being emitted.

## Commented out code

I encountered a few times in which I just commented out code for
experimentation and forgot to uncomment it.

## Incorrect defintions

Sometimes, I just got definitions wrong, because of the way I extracted the BNF
syntax definitions.

## Nuances with how the generic parsers work

In particular, generic parsers that would read some sort of delimited list
would digest trailing delimiters, including whitespace.
