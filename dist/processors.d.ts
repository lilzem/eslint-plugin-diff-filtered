import type { Linter } from "eslint";
declare const diff: Required<Linter.Processor<string | Linter.ProcessorFile>>;
declare const diffConfig: Linter.BaseConfig;
export { diff, diffConfig };
