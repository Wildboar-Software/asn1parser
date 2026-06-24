import {
    ASN1ParserExpectationError,
    ASN1SemanticError,
    ASN1SyntaxError,
    Production,
    ProductionType,
} from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, it } from 'node:test';
import { strictEqual as assertEqual, strict as assert } from 'node:assert';

const baseloc = {
    startIndex: 0,
    endIndex: 90,
    lineNumber: 1,
    columnNumber: 1,
    assignmentName: "foo",
    executionDirectory: "/foo",
    fileName: "bar.txt",
    moduleName: "InformationFramework",        
};

const prodA = new Production(
    ProductionType.SYNTAX_ERROR,
    [],
    {
        ...baseloc,
        endIndex: 30,
    },
);

const prodB = new Production(
    ProductionType.SYNTAX_ERROR,
    [],
    {
        ...baseloc,
        startIndex: 30,
        endIndex: 60,
        columnNumber: 30,
    },
);

const prodC = new Production(
    ProductionType.SYNTAX_ERROR,
    [],
    {
        ...baseloc,
        startIndex: 60,
        endIndex: 90,
        columnNumber: 60,
    },
);

const prodRoot = new Production(
    ProductionType.SYNTAX_ERROR,
    [prodA, prodB, prodC],
    baseloc,
);

describe("ASN1ParserExpectationError", () => {
    it("does not turn into a giant string when stringified", () => {
        const e = new ASN1ParserExpectationError(
            "hi mom",
            prodRoot,
            "LuvsMeMumModule",
        );
        assert(`${e}`.length < 100);
    });
});

describe("ASN1SemanticError", () => {
    it("does not turn into a giant string when stringified", () => {
        const e = new ASN1SemanticError(
            "hi mom",
            prodRoot,
            "LuvsMeMumModule",
        );
        assert(`${e}`.length < 100);
    });
});

describe("ASN1SyntaxError", () => {
    it("does not turn into a giant string when stringified", () => {
        const e = new ASN1SyntaxError(
            prodRoot,
            "hi mom",
            "LuvsMeMumModule",
        );
        assert(`${e}`.length < 100);
    });
});
