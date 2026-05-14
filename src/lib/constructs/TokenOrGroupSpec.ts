// `SyntaxList ::= "{" TokenOrGroupSpec empty + "}"`

export type TokenOrGroupSpec = string | TokenOrGroupSpec[];
