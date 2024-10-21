declare const configs: {
    diff: import("eslint").Linter.BaseConfig<import("eslint").Linter.RulesRecord, import("eslint").Linter.RulesRecord>;
};
declare const processors: {
    diff: Required<import("eslint").Linter.Processor<string | import("eslint").Linter.ProcessorFile>>;
};
export { configs, processors };
