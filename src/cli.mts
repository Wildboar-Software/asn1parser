#!/usr/bin/env node
/// <reference types="node" />

import { readFileSync, writeFileSync } from 'node:fs';
import { argv, exit, stderr, stdout } from 'node:process';
import {
  correct,
  grok,
  lex,
  LogLevel,
  parse,
} from './index.mjs';
import { Production, type ParseContext } from './index.mjs';
import consoleLogger from './lib/loggers/console.mjs';

const USAGE_COMMANDS = [
  'lex',
  'cst',
  'ast',
  'check',
  'help',
  'version',
] as const;

type UsageCommand = (typeof USAGE_COMMANDS)[number];
type PipelineCommand = 'lex' | 'cst' | 'ast' | 'check';

interface CliOptions {
  help: boolean;
  version: boolean;
  pretty: boolean;
  output: string | undefined;
  command: string | undefined;
  files: string[];
}

interface ParseArgsError {
  error: string;
}

const GENERAL_HELP = `\
Usage: asn1parser <command> [options] [files...]

Parse ASN.1 modules and print lexical tokens, a concrete syntax tree,
or an abstract syntax tree as JSON.

Commands:
  lex                Print lexical tokens as JSON
  cst                Print the concrete syntax tree as JSON
  ast                Print the abstract syntax tree as JSON
  check              Parse files and print ok on success
  help [command]     Show this help, or help for a command
  version            Print the version

Options:
  -o, --output FILE  Write output to FILE instead of stdout
  -p, --pretty       Pretty-print JSON using tabs
  -h, --help         Show this help
      --version      Print the version

Files are concatenated in the order given. Locations in the JSON refer
to the concatenated document.

Examples:
  npx asn1parser lex module.asn1
  npx asn1parser --pretty ast a.asn1 b.asn1
  npx asn1parser check module.asn1
  npx asn1parser cst -o cst.json module.asn1
`;

const COMMAND_HELP: Record<PipelineCommand, string> = {
  lex: `\
Usage: asn1parser lex [options] FILE...

Print lexical tokens from the concatenated FILE(s) as JSON.

Options:
  -o, --output FILE  Write output to FILE instead of stdout
  -p, --pretty       Pretty-print JSON using tabs
  -h, --help         Show this help
`,
  cst: `\
Usage: asn1parser cst [options] FILE...

Parse the concatenated FILE(s) and print the concrete syntax tree as JSON.

Options:
  -o, --output FILE  Write output to FILE instead of stdout
  -p, --pretty       Pretty-print JSON using tabs
  -h, --help         Show this help
`,
  ast: `\
Usage: asn1parser ast [options] FILE...

Parse, grok, correct, and normalize the concatenated FILE(s), then print
the abstract syntax tree as JSON.

Options:
  -o, --output FILE  Write output to FILE instead of stdout
  -p, --pretty       Pretty-print JSON using tabs
  -h, --help         Show this help
`,
  check: `\
Usage: asn1parser check [options] FILE...

Parse, grok, correct, and normalize the concatenated FILE(s).
Print ok and exit 0 on success.

Options:
  -o, --output FILE  Write ok to FILE instead of stdout
  -h, --help         Show this help
`,
};

function isUsageCommand(value: string): value is UsageCommand {
  return (USAGE_COMMANDS as readonly string[]).includes(value);
}

function isPipelineCommand(value: string): value is PipelineCommand {
  return value === 'lex'
    || value === 'cst'
    || value === 'ast'
    || value === 'check';
}

function parseArgs(args: string[]): CliOptions | ParseArgsError {
  let help = false;
  let version = false;
  let pretty = false;
  let output: string | undefined;
  const positionals: string[] = [];
  let endOfFlags = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (!endOfFlags && arg === '--') {
      endOfFlags = true;
      continue;
    }
    if (!endOfFlags && (arg === '--help' || arg === '-h')) {
      help = true;
      continue;
    }
    if (!endOfFlags && arg === '--version') {
      version = true;
      continue;
    }
    if (!endOfFlags && (arg === '--pretty' || arg === '-p')) {
      pretty = true;
      continue;
    }
    if (!endOfFlags && (arg === '--output' || arg === '-o')) {
      const next = args[i + 1];
      if (next === undefined) {
        return { error: 'option -o/--output requires a file path' };
      }
      output = next;
      i++;
      continue;
    }
    if (!endOfFlags && arg.startsWith('-')) {
      return { error: `unrecognized option '${arg}'` };
    }
    positionals.push(arg);
  }

  const command = positionals[0];
  const files = command === undefined ? [] : positionals.slice(1);
  return { help, version, pretty, output, command, files };
}

function readPackageVersion(): string {
  const pkgUrl = new URL('../package.json', import.meta.url);
  const pkg = JSON.parse(readFileSync(pkgUrl, 'utf8')) as { version: string };
  return pkg.version;
}

function jsonReplacer(_key: string, value: unknown): unknown {
  if (value instanceof Set) {
    return [...value];
  }
  if (value instanceof Map) {
    return Object.fromEntries(value);
  }
  return value;
}

function stringifyJson(value: unknown, pretty: boolean): string {
  return pretty
    ? JSON.stringify(value, jsonReplacer, '\t')
    : JSON.stringify(value, jsonReplacer);
}

function writeOutput(text: string, outputPath: string | undefined): void {
  const withNewline = text.endsWith('\n') ? text : `${text}\n`;
  if (outputPath !== undefined) {
    writeFileSync(outputPath, withNewline, 'utf8');
  } else {
    stdout.write(withNewline);
  }
}

function usageError(message: string): never {
  stderr.write(`${message}\n`);
  stderr.write("Try 'asn1parser --help' for more information.\n");
  exit(2);
}

function printParseErrors(parseResult: ParseContext): void {
  const errors = Object.values(parseResult.syntaxErrors);
  if (errors.length === 0) {
    stderr.write('Parse failed.\n');
    return;
  }
  for (const err of errors) {
    const loc = err.production.location;
    stderr.write(`${loc.lineNumber}:${loc.columnNumber}: ${err.message}\n`);
  }
}

function formatError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}

function parseFailed(parseResult: ParseContext): boolean {
  return Boolean(parseResult.error)
    || Object.keys(parseResult.syntaxErrors).length > 0;
}

function concatFiles(files: string[]): string {
  return files.map((file) => readFileSync(file, 'utf8')).join('\n');
}

function grokCorrect(text: string, parseResult: ParseContext): ReturnType<typeof grok> {
  const modules = grok(text, parseResult);
  correct(modules);
  return modules;
}

function helpFor(command: string | undefined): string {
  if (command !== undefined && isPipelineCommand(command)) {
    return COMMAND_HELP[command];
  }
  return GENERAL_HELP;
}

function deleteChildren(prod: Production): Production {
  return new Production(prod.type, [], prod.location);
}

function runPipeline(command: PipelineCommand, files: string[], pretty: boolean): string {
  const text = concatFiles(files);
  if (command === 'lex') {
    return stringifyJson(Array.from(lex(text)), pretty);
  }
  const parseResult = parse(text);
  if (parseFailed(parseResult)) {
    printParseErrors(parseResult);
    exit(1);
  }
  if (command === 'cst') {
    return stringifyJson(parseResult.cst, pretty);
  }
  const modules = grokCorrect(text, parseResult);
  if (command === 'check') {
    return 'ok';
  }
  for (const mod of modules) {
    if (mod.production) {
      mod.production = deleteChildren(mod.production);
    }
    delete mod.productionType;
    for (const arc of mod.oid ?? []) {
      delete arc.production;
      delete arc.productionType;
      delete arc.text;
    }
    for (const assignment of Object.values(mod.assignments)) {
      if (assignment.production) {
        assignment.production = deleteChildren(assignment.production);
      }
      delete assignment.productionType;
      delete assignment.text;
    }
  }
  return stringifyJson(modules, pretty);
}

function main(): void {
  consoleLogger.level = LogLevel.silent;

  const parsed = parseArgs(argv.slice(2));
  if ('error' in parsed) {
    usageError(parsed.error);
  }

  const { help, version, pretty, output, command, files } = parsed;

  if (command === 'help') {
    const topic = files[0];
    if (topic !== undefined && !isUsageCommand(topic)) {
      usageError(`unknown command '${topic}'`);
    }
    stdout.write(helpFor(topic));
    return;
  }

  if (help) {
    if (command !== undefined && !isUsageCommand(command)) {
      usageError(`unknown command '${command}'`);
    }
    stdout.write(helpFor(command));
    return;
  }

  if (version || command === 'version') {
    stdout.write(`${readPackageVersion()}\n`);
    return;
  }

  if (command === undefined) {
    usageError('missing command');
  }

  if (!isPipelineCommand(command)) {
    usageError(`unknown command '${command}'`);
  }

  if (files.length === 0) {
    usageError(`missing FILE operand for '${command}'`);
  }

  try {
    writeOutput(runPipeline(command, files, pretty), output);
  } catch (err) {
    stderr.write(`${formatError(err)}\n`);
    exit(1);
  }
}

main();
