/**
 * Library of helper functions for handling files and folders.
 *
 * @packageDocumentation
 */

import { mkdir, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { PrettifyCallbackFunction } from "@graphql-markdown/types";

export { readFile, copyFile } from "node:fs/promises";

/**
 * Asynchronously create a folder structure if it does not exist.
 *
 *
 * @param location - folder structure in path format.
 *
 * @example
 * ```js
 * import { ensureDir } from '@graphql-markdown/utils/fs';
 *
 * await ensureDir("./.temp/local")
 *
 * // Creates both folders if they do not exists.
 * ```
 *
 */
export async function ensureDir(location: string): Promise<void> {
  if (!(await fileExists(location))) {
    await mkdir(location, { recursive: true });
  }
}

/**
 * Asynchronously check if a file or folder exists at the path location.
 *
 *
 * @param location - file or folder location.
 *
 * @example
 * ```js
 * import { fileExists } from '@graphql-markdown/utils/fs';
 *
 * await fileExists("./.temp/local")
 *
 * // Expected true if path is valid, false if not
 * ```
 *
 * @returns `true` if the path is valid, else `false` if not.
 *
 */
export async function fileExists(location: string): Promise<boolean> {
  try {
    const stats = await stat(location);
    return typeof stats === "object";
  } catch (error) {
    return false;
  }
}

/**
 * Asynchronously save a file with a string content at specified location in local FS.
 * Override the file content if the file already exists.
 * The function calls `ensureDir(dirname(location))` to create the folder structure if missing.
 *
 *
 * @param location - file location.
 * @param content - data to be written into the file (UTF-8 string).
 * @param prettify - optional callback function for prettifying the content.
 *
 * @example
 * ```js
 * import { saveFile } from '@graphql-markdown/utils/fs';
 *
 * await saveFile("./.temp/local.md", "foobar")
 *
 * // Created .temp folder if it does not exists, and save data into local.md
 * ```
 *
 * @returns `true` if the path is valid, else `false` if not.
 *
 */
export async function saveFile(
  location: string,
  content: string,
  prettify?: PrettifyCallbackFunction,
): Promise<void> {
  if (typeof prettify === "function") {
    content = (await prettify(content)) ?? content;
  }
  await ensureDir(dirname(location));
  await writeFile(location, content, "utf8");
}
