"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffConfig = exports.diff = void 0;
const git_1 = require("./git");
const utils_1 = require("./utils");
const isLineWithinRange = (line) => (range) => range.isWithinRange(line);
const getPostProcessor = () => (messages, filename) => {
    if (messages.length === 0)
        return [];
    const rangesForDiff = (0, git_1.getRangesForDiff)((0, git_1.getDiffForFile)(filename));
    const currentCommitMessages = [];
    const otherCommitMessages = [];
    messages.flat().forEach((message) => {
        if (message.fatal || rangesForDiff.some(isLineWithinRange(message.line))) {
            currentCommitMessages.push(message);
        }
        else {
            otherCommitMessages.push(message);
        }
    });
    const top5OtherCommitMessages = (0, utils_1.filterMessages)(otherCommitMessages).slice(0, 5);
    return [...currentCommitMessages, ...top5OtherCommitMessages];
};
const getProcessors = () => ({
    preprocess: (text) => [text],
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
exports.diff = diff;
const diffConfig = {
    plugins: ["diff"],
    overrides: [
        {
            files: ["*"],
            processor: "diff-filtered/diff",
        },
    ],
};
exports.diffConfig = diffConfig;
