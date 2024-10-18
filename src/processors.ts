import type { Linter } from "eslint";
import { getDiffForFile, getRangesForDiff } from "./git";
import type { Range } from "./Range";
import { filterMessages } from "./utils";

const isLineWithinRange = (line: number) => (range: Range) => range.isWithinRange(line);

const getPostProcessor = () => (
  messages: Linter.LintMessage[][],
  filename: string
): Linter.LintMessage[] => {
  if (messages.length === 0) return [];

  const rangesForDiff = getRangesForDiff(getDiffForFile(filename));

  const currentCommitMessages: Linter.LintMessage[] = [];
  const otherCommitMessages: Linter.LintMessage[] = [];

  messages.flat().forEach((message) => {
    if (message.fatal || rangesForDiff.some(isLineWithinRange(message.line))) {
      currentCommitMessages.push(message);
    } else {
      otherCommitMessages.push(message);
    }
  });

  const top5OtherCommitMessages = filterMessages(otherCommitMessages).slice(0, 5);

  return [...currentCommitMessages, ...top5OtherCommitMessages];
};

const getProcessors = (): Required<Linter.Processor> => ({
    preprocess: (text: string) => [text],
    postprocess: getPostProcessor(),
    supportsAutofix: true,
    name: "",
    version: "",
    meta: {
        name: undefined,
        version: undefined
    }
});

const diff = getProcessors();

const diffConfig: Linter.BaseConfig = {
  plugins: ["diff"],
  overrides: [
    {
      files: ["*"],
      processor: "diff/diff",
    },
  ],
};

export { diff, diffConfig };
