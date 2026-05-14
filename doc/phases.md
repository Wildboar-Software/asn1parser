# Phases of Compilation

## A Typical Compiler

In courses on compiler design, you learn a somewhat standard series of stages
through which code passes on its way to becoming computer-executable binaries.

I will describe these stages here for clarity, but only as a baseline to
explain how this ASN.1 compiler deviates from them.

### Lexing

The input to lexing is the raw string, which is usually the contents of a file.
Lexing iterates over every character in the
file, grouping them together into "lexemes" or "tokens." Lexemes are atomic
textual symbols. If you think about it, in a programming language, if you define
a variable `numberOfBoops`, no subsequent stage of compilation would have any
meaningful interest in a fraction of that symbol, such as `numberOfB`. That
symbol is atomic, in this sense. Breaking the document into _atoms_ is the
primary purpose of lexing.

You could arguably consider it a separate purpose, but one of the
other ways that lexing is useful is for parsing strings, regular expressions,
and comments. In the case of reading a string, it might seem as basic as
fast-forwarding to the next closing quotation mark, but most programming
languages support some concept of "escapes" whereby you can insert quotation
marks within a string (or other characters) and indicate to the compiler that
such escaped quotation marks are not intended to terminate the string, but are
intended for incorporation into it. Since these escaped characters are just
another character in the string, if we can assume that the compiler has no
interest in the actual contents of the string, the lexer can take care of the
"unescaping" for us by skipping over the markup used to escape the character in
question, and produce a single atomic string rather than multiple lexemes that
represent the escapes, their markup, and the string fragments between them.

As far as I know, there is generally one right way to lex a string.

### Parsing

After we have generated the stream of lexical tokens from the raw text, we can
supply this stream of tokens to the parser. The parser's job is to generate a
hierarchical tree-like data structure _that is traversible_. Each node in the
tree represents a grammatical _production_. To relate this to human languages,
an example of a _production_ would be the clause within a sentence, whereas a
lexeme would be the individual words, spacing, and punctuation marks.

When this
grammatical tree contains concrete details of the text, such as the start and
end indices of productions within the document, or if it generally preserves
details that are only of syntactic importance, it is referred to as a "Concrete
Syntax Tree" or "CST." A concrete syntax tree would retain, for instance, the
parentheses surrounding the arguments to a function call.

On the other hand, when these details are abstracted into data structures that
provide only details that more semantic phases of compilation care about, this
tree-like data structure is referred to as an "Abstract Syntax Tree" or "AST."
Contrasting with the previous example, the abstract syntax tree node for a
function call would not include anything about the parentheses surrounding the
arguments; an AST node for a function call might put the arguments into an
array and annotate the function call with metadata. The CST equivalent would
containg the arguments, the commas between them, the whitespace, and any
comments as well. Again, the point of converting a CST to an AST is to remove
details that subsequent stages of compilation do not care about, and to perform
any other transformations, simplifications, and annotations that make it easier
for the subsequent stages to traverse and analyze the document.

Unlike lexing, there are many ways to parse a stream of tokens into a CST. I
will only describe "top-down" parsing here, because that is what my compiler
uses. In my opinion, this is the best parsing methodology in most use cases.

#### Top-Down Parsing

Top-Down Parsing starts with a function that parses a whole document. This might
sound like a tautology, but bear with me. The document parser will be composed
of "child parsers" that each parse the constituents of a document, each of which
will return the index of the token on which it finished reading the constituent,
or just the number of tokens read. The finish line for a child parser is the
next child parser's starting line. All of the child parsers execute until there
are no more child parsers in line in the composition of the parent parser.

To explain by example, and to do so by continuing to relate it to human
languages, a top-down parser would begin with a call to the function that reads
an essay. What is an essay composed of? A series of paragraphs. So the document
parsing function would repeatedly call the function to parse paragraphs until
there are no more paragraphs. How is a paragraph parsed? By parsing sentences,
of course. The paragraph parser, therefore, would repeatedly call the function
to parse a sentence until we run into the end of a paragraph, which might be
indicated by two newlines followed by an indentation. How is a sentence parsed?
By parsing the clauses, of course!

Perhaps the pattern is clear now: top-down parsing works by a parser calling
the parsers from which it is composed. This cascade of parsing continues
"downward" until we reach lexeme parsers, whose only purpose is to read a single
lexical token, such as a period or an exclamation point.

If you are a lateral-thinker, you may have asked yourself: how would a parser
handle a scenario where one of many syntactic alternatives could be used? In
other words, how would our sentence-parsing function handle the terminal
punctuation, which could be a period, an exclamation point, or a question mark?
The sentence-parsing function would, after every word parsed, attempt to
parse terminal punctuation. If it failed to parse the terminal punctuation, the
parser would just infer that it has not yet reached the end of the sentence, and
attempt to read another word, whitespace, or some other non-terminal
punctuation, such as a comma. The terminal punctuation parser would, in turn,
attempt to parse every alternative: it would be composed of a period-parsing
function, an exclamation-point-parsing function, and a question-mark-parsing
function. It would attempt each of these until one succeeds in parsing or until
all of them fail. If all of them fail, as stated above, the terminal
punctuation parser would return a value to the parent parser that would indicate
that it could not read any terminal punctuation, and the parent parser would
continue to parse words, whitespace, or non-terminal punctuation. If any
alternative of the terminal punctuation parser succeeded, however, it would
indicate success to the parent parser by returning the number of tokens read or
the absolute position of the "finish line."

#### Problems with Top-Down Parsing

There are typically more types of production parsers than those described above,
but just the two I have described can be used to compose very complex parsers.

For clarity, the two types of production parsers I have described are:

- A parser that calls a _sequence_ of parsers, succeeding if all constituents
  succeed.
- A parser that calls a _choice_ of parsers, succeeding if a single constituent
  succeeds.

While these constructs are powerful, they can easily be used disastrously.

##### Infinite Recursion

Grammatical productions may be defined _recursively_. This means that a
grammatical production may be defined in terms of itself. This is often used
when defining lists.

For example, let's say you have a theoretical programming
language that is only composed of the letters A and B, but there may be any
number of A's and B's in any order. For such a programming language, you might
define a grammatical production `ABList` that is defined as an A or B possibly
followed by another `ABList` _in that order_. The parser would read an A or B,
then attempt to read another `ABList`, which entails reading another A or B, and
another optional `ABList`. If the list is not infinitely long, the parser will
eventually reach an `ABList` that does not end with another `ABList` and
"unwind" until the first `ABList` parser returns with the number of tokens read.

Let's say that, on the other hand, you swapped the order of the constituents in
an `ABList` parser such that an `ABList` is defined as an `ABList` followed by
an optional A or B. Theoretically, this should have the same effect, but the
problem is that the parser will recurse infinitely in trying to parse an
`ABList`. The parser will execute the function to read an `ABList`, but the very
first constituent parser that it must execute to read an `ABList` is yet another
`ABList`, meaning that the `ABList` parser will repeatedly execute itself
forever. (This does not actually run forever: the computer will eventually run
out of memory from all of the incomplete function calls piling up on the stack.)

This was a simple example, but let's say that `ABList` was redefined as a
`ListItem` and this new production, `ListItem`
were defined as an `ABList` followed by an optional A or B. Still, infinite
recursion would occur, because the `ListItem` parser would call the `ABList`
parser and vice versa, infinitely. This scenario is harder to debug, because the
source of the infinite recursion is less obvious. The child `ABList` is "buried"
within the definition of its parent `ABList`.

##### Underparsing

Another tragic scenario occurs when a choice parser attempts child parsers in
such an order that a child parser that is identical to the prefix of another
child parser is read before the latter. Even writing this myself, I find that
description confusing, so here is an example of what I mean: let's say you have
another simple language defined by two sentences (without terminal punctuation):

- "Let's go"
- "Let's go to the store"

If your choice parser attempts the "Let's go" alternative first, but the
language user actually typed in "Let's go to the store," the parser would read
the first alternative and _terminate prematurely_. If this were as simple as
our syntax gets, the parser would succeed and just ignore the " to the store."
However, if the grammar of this language expected terminal punctuation at the
end of the sentence, it would fail, because it would have left off at the space
between "go" and "to" but it would attempt to read a period or exclamation
point.

As with infinite recursion, the underlying problem has to do with the ordering
of constituent parsers, and likewise, the solution is to re-order them so that
more specific parsers preceed more generic ones in a choice parser. If we
swapped the ordering of the two alternatives in our example, our example parser
would correctly attempt to read the "Let's go to the store" alternative first,
but then fall back upon reading "Let's go" if " go to the store" could not be
found.

##### Overparsing

There is yet another common pitfall, which is kind of the opposite of the
previous scenario. A parser could _overread_ instead of _underread_. In my
experience, this is a lot less common, but this can happen if a parser ends
with a sequence of optional parsers and one of those parsers is a mandatory
constituent of the next parser. The real-life scenario I have ran into is when
my parser would attempt to parse a whitespace-delimited list, the items of which
ended with an optional whitespace and something else optional. If that last
optional thing could not be read, the list item parser would still consume the
optional whitespace. When the list item parser returned, the parent parser would
attempt to read the whitespace that is supposed to delimit items in the list,
but it would fail because it already read past that whitespace.

The solution to this problem, unlike the previous problem, is not fixed by
reordering components, but rather, by making optional trailing sequences
succeed or fail as a unit. In the case described above, the solution is to
compose the list item parser from two alternatives: one that ends with a
optional whitespace and a _mandatory_ other thing, and one that ends with
neither whitespace nor the other thing. To avoid underparsing, the former must
be attempted before the latter.

### The Other Stages

Beyond this point, what happens diverges greatly between programming languages.
Some programming languages will attempt to optimized the parser-generated
abstract syntax tree, generating an abstract syntax tree that is not
representative of the syntax the language user really used, but one that still
achieves the same results in some better way. Other languages might be satisfied
with the quality of the AST and begin translating the AST into an intermediary
representation that is more similar to the desired executable. My ASN.1 compiler
does not do this, so there is no need for me to describe these stages.

## Problems with ASN.1

ASN.1 comes with many challenges over programming languages. For starters, ASN.1
does not enforce a define-before-use rule that most programming languages do.
When a define-before-use rule is in place, as the parser reads the document, it
learns new assignments, and for each of them, it will already know every symbol
that could be used legally in their definitions. For that reason, assignments
can be fully understood before the document is fully done parsing. Information
obtained from previously parsed productions can be used to guide the parser in
parsing subsequent productions.

For instance, if you were parsing the C programming language and the parser read
`int value = `, the parser could attempt to parse a number first, since that
production makes the most sense as an expression that would be assigned to a
variable having type `int`. On the other hand, if you did not have a
define-before-use rule and if we were to define an alias to `int` further on
down in the document, such as `NumberType`, if the C parser were to read
`NumberType value = `, it would not know what type to expect from the following
expression.

For this reason, ASN.1 requires a "double-pass." "Dumb parsing" must be done
first, and because ASN.1 has a lot of productions that are indistinguishable
from each other, this "dumb parsing" will make a lot of mistakes. Once the
entire document has been parsed, the compiler must review it again and fix these
mistakes.

For example, a simple pair of curly brackets with nothing between them, `{}`
could be a value of any of these data types in ASN.1:

- `BIT STRING`
- `OCTET STRING`
- `SEQUENCE`
- `SEQUENCE OF`
- `SET`
- `SET OF`
- `CharacterString`

There are probably even more that I forgot about, but the point still stands. We
cannot use a `BIT STRING` value where a `SET OF` value is expected. If the
parser identified the curly brackets as a `BIT STRING` value in this case, the
compiler would have to correct this on a second sweep.

## This ASN.1 Compiler

This ASN.1 Compiler uses a lexer and a parser as described above. There is not
a term for this that I am aware of, so I referred to the conversion of the CST
to the AST as "groking," referring to the term adopted from Robert Heinlein's
Stranger in a Strange Land whose definition I am just copying straight from
Wikipedia:

> To understand intuitively or by empathy, to establish rapport with.

In hindsight, I don't think this was a good choice of a word for this, but I
chose it because, at the time of this decision, I thought "grok" meant simply
to "understand at a deep level." Conversion of the CST to an AST is the
compiler's way of "understanding" what the language user is saying "at a deep
level," so it was an excellent choice of terminology given my misunderstanding
of the definition.

For clarification, the stages I have named so far are (in order):

- Lexing
- Parsing
- Groking

After groking, the compiler has a deeper understanding of the user-supplied
text, and can use a little reasoning to correct errors. Therefore, the next
phase is Correction, where the compiler sweeps the AST for mistakes and corrects
them.

### Normalization

After Correction, the AST should be an honest _and_ semantically correct
representation of what the user's input intends to express. Now having this
correct representation, we can further optimize it. The next stage is called
"normalization."

Yet again, I picked bad terminology. In the beginning, it was ideal, because the
term was true to what this phase did, but I added more to it which made the term
deceptive.

In the examples below, I often show the transformations applied by the
normalization phase with ASN.1, but this is only for the purpose of clarity:
the raw text of the ASN.1 is never transformed. Rather, the resulting AST is
transformed. The "before" and "after" ASN.1 is just the ASN.1 representation of
the transformation that takes place within the AST.

#### Unnesting

I took the term "normalization" from relational database theory to
refer to "unnesting" of data from tables and relating them to each other via
foreign key constraints. Unnesting may be the most important optimization this
phase performs.

ASN.1 allows users to nest sometimes complex structured types within other
types. Here is an example:

```asn1
Person ::= SEQUENCE {
    age    CHOICE {
        years       INTEGER,
        birthDate   DATE
    }
}
```

Unnesting would transform the above example into this:

```asn1
Person-age ::= CHOICE {
    years       INTEGER,
    birthDate   DATE
}

Person ::= SEQUENCE {
    age     Person-age
}
```

As you can see, unnesting has the effect of "flattening" the ASN.1. These flat
productions are much friendlier for compilation to a programming language. For
example, in TypeScript, you cannot (I think) define classes within other
classes. So this ASN.1

```asn1
Person ::= SEQUENCE {
    name    SEQUENCE {
        first       UTF8String,
        last        UTF8STring
    }
}
```

would produce this invalid TypeScript:

```typescript
class Person {
    constructor (
        readonly name: class Person_name { // What do you do here?
            constructor (
                readonly first: string,
                readonly last: string,
            ) {}
        }
    ) {}
}
```

But after unnesting, we could easily generate valid TypeScript like so:

```typescript
class Person_name {
  constructor(readonly first: string, readonly last: string) {}
}

class Person {
  constructor(readonly name: Person_name) {}
}
```

If you have worked with relational databases before, you might understand why I
called this phase "normalization." However, normalization now does more than
this, which is why it is now a bad name for this phase. I should have just
called it "optimization."

#### Dependency Ordering

One of the other critical things this phase does is affix a dependency index to
each assignment in an ASN.1 module. This is a number that indicates the order in
which assignments of a module ought to be compiled so that the resulting code
does not attempt to use a symbol before it is defined.

The normalizer does this by drilling into every assignment, and, for every
identifier used, adds that identifier to a list of dependencies with which the
assignment is annotated.

For example, normalization of this ASN.1 assignment

```asn1
Person ::= SEQUENCE {
    age     Person-age
}
```

would add `Person-age` to the dependencies of the `Person` assignment. Once the
dependencies of all assignments are identified, a graph library is used to
correctly order the dependencies. In the example above, `Person` would be
annotated with a higher dependency index and `Person-age` would have a lower
dependency index. Later on, during the actual compilation, the compiler would
sort these assignments by their dependency index so that `Person-age` gets
compiled to the targeted language before `Person` does.

#### Replicating COMPONENTS OF

Normalization replicates the components of a `SEQUENCE` or `SET` type that is
referenced by a `COMPONENTS OF` clause like so:

This:

```asn1
Name ::= {
    firstName   UTF8String,
    lastName    UTF8String
}

Person ::= SEQUENCE {
    name    COMPONENTS OF Name,
    age     INTEGER
}
```

Get transformed into this:

```asn1
Name ::= {
    firstName   UTF8String,
    lastName    UTF8String
}

Person ::= SEQUENCE {
    firstName   UTF8String,
    lastName    UTF8String,
    age     INTEGER
}
```

#### Annotating

Normalization also applies tags to types. Even though this could be determined
by the compiler as-needed, it will almost certainly be needed, so it makes
sense to just get it out of the way. A type does not have to be a prefixed type
to receive a tag.

Another annotation that occurs during this phase is the association of a module
with assignments. If one part of the program receives a module, it can know that
an assignment belongs to said module if the assignment is within the AST for
that module. However, if only given an assignment, there is no way to know what
assignment it came from unless it is explicitly annotated on the assignment. It
may be a little redundant to have module information with every assignment, but
I think it will help down the road.

### Compilation

Compilation is the last stage of the... compilation. At the compilation stage,
a different library entirely, called the "target library," consumes the
(possibly normalized) AST and generates the code in the corresponding language.

In the TypeScript library, this ASN.1:

```asn1
id-foo OBJECT IDENTIFIER ::= { 2 5 1 3 }
```

Gets transformed to this TypeScript:

```typescript
export const id_foo: OBJECT_IDENTIFIER ::= new _OID([ 2, 5, 1, 3 ]);
```

However, the details of compilation are beyond the scope of this library,
because the methodology for compilation could vary widely between targeted
languages.
