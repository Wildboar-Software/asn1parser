import { LogLevel, type GrokContext } from "../index.mjs";
import { default as consoleLogger } from "./loggers/console.mjs";

/**
 * @summary Create a groking context object
 * @description
 * 
 * "Groking" in this package's parlance, means converting a concrete syntax
 * tree (CST), or a subtree of it, to usable data structures. Each of the
 * functions that do this take a "context" object, so that some state can
 * persist between calls. This function helps you construct this object.
 * 
 * @param text The same text that was passed into the corresponding parser
 * @param parsedEnumItems The set of enum variant identifiers encountered
 * @param consoleLogLevel The log level to log to the console. This is a
 *  static variable due to poor design on my part, so if you set this, all
 *  subsequent executions will be affected.
 *
 * @returns A grok context object
 */
export function createGrokContext(
    text: string,
    parsedEnumItems: Set<string> = new Set(),
    consoleLogLevel?: LogLevel,
): GrokContext {
    if (consoleLogLevel) {
        consoleLogger.level ??= consoleLogLevel;
    }
    return {
        log: consoleLogger,
        text,
        currentModule: {},
        enumItems: parsedEnumItems,
    };
}

export default createGrokContext;
