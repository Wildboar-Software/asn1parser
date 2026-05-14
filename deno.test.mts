/// <reference types="deno" />
import { lex, LogLevel, grok, ProductionType, normalize, parse, correct, AssignmentType, TypeType } from './dist/index.mjs';
import { assertEquals } from "jsr:@std/assert";

Deno.test('this module can be imported and used by Deno', () => {
  const text = 'A {iso} DEFINITIONS ::= BEGIN B ::= NULL END';
  const lexResults = Array.from(lex(text));
  const parseResults = parse(text, lexResults);
  const modules = grok(text, parseResults);
  const normalizedModules = normalize(modules);
  correct(normalizedModules);
  assertEquals(normalizedModules[0].name, 'A');
});
