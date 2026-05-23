import { lex, LogLevel, parse, ProductionType, Production } from '../dist/index.mjs';
import find from '../dist/lib/find.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, test } from 'node:test';
import { strict as assert, strictEqual as assertEqual, deepStrictEqual } from 'node:assert';

test('Production can be serialized to JSON correctly', () => {
    const prod = new Production(
        ProductionType.ExternalValueReference,
        [
            new Production(
                ProductionType.identifier,
                [],
                { startIndex: 0, endIndex: 5 },
            ),
        ],
    );

    const expected = {
        type: "ExternalValueReference",
        location: { startIndex: 0, endIndex: 5 },
        children: [
            {
                type: "identifier",
                children: [],
                location: { startIndex: 0, endIndex: 5 },
            },
        ],
    };
    deepStrictEqual(prod.toJSON(), expected);
});
