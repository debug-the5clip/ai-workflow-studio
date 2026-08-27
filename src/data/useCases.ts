export { COMPANY_CONTEXT } from "./uc1";
export * from "./sources";
import { UC_1_8 } from "./uc1";
import { UC_9_16 } from "./uc2";
import { UC_17_24 } from "./uc3";
import type { UseCase } from "@/lib/lab-types";

export const USE_CASES: UseCase[] = [...UC_1_8, ...UC_9_16, ...UC_17_24];
