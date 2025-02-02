import type { PrintTypeOptions } from "@graphql-markdown/types";

import { printObjectMetadata, printCodeType } from "./object";

export const printInterfaceMetadata = printObjectMetadata;

export const printCodeInterface = (
  type: unknown,
  options: PrintTypeOptions,
): string => printCodeType(type, "interface", options);
