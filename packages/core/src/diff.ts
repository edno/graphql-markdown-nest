import type {
  DiffMethodName,
  FunctionCheckSchemaChanges,
  GraphQLSchema,
  Maybe,
} from "@graphql-markdown/types";

import { log } from "@graphql-markdown/logger";

export const hasChanges = async (
  schema: GraphQLSchema,
  tmpDir: string,
  diffMethod: Maybe<DiffMethodName>,
  diffModule: Maybe<string> = "@graphql-markdown/diff",
): Promise<boolean> => {
  if (typeof diffMethod !== "string" || typeof diffModule !== "string") {
    return true;
  }

  try {
    const {
      checkSchemaChanges,
    }: { checkSchemaChanges: FunctionCheckSchemaChanges } = await import(
      diffModule
    );
    return await checkSchemaChanges(schema, tmpDir, diffMethod);
  } catch (error: unknown) {
    log(
      `Cannot find module '${diffModule}' from @graphql-markdown/core!`,
      "warn",
    );
    return true;
  }
};
