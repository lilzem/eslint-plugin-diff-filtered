"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRangesForDiff = exports.getDiffForFile = void 0;
const child_process = __importStar(require("child_process"));
const path_1 = require("path");
const Range_1 = require("./Range");
const COMMAND = "git";
const OPTIONS = { maxBuffer: 1024 * 1024 * 100 };
const getDiffForFile = (filePath) => {
    const args = [
        "diff",
        "--diff-algorithm=histogram",
        "--diff-filter=ACM",
        "--find-renames=100%",
        "--no-ext-diff",
        "--relative",
        "--unified=0",
        process.env.ESLINT_PLUGIN_DIFF_COMMIT ?? "HEAD",
        "--",
        (0, path_1.resolve)(filePath),
    ];
    return child_process.execFileSync(COMMAND, args, OPTIONS).toString();
};
exports.getDiffForFile = getDiffForFile;
const isHunkHeader = (input) => /^@@ [^@]* @@/u.exec(input);
const getRangeForChangedLines = (line) => {
    const rangeRE = /^@@ .* \+(?<start>\d+)(?<linesCountDelimiter>,(?<linesCount>\d+))? @@/u;
    const range = rangeRE.exec(line);
    if (!range)
        throw Error(`Couldn't match regex with line '${line}'`);
    const { start = "0", linesCountDelimiter = ",0", linesCount = "0" } = range.groups ?? {};
    const lines = linesCountDelimiter && linesCount ? parseInt(linesCount) : 1;
    const hasAddedLines = lines !== 0;
    const startLine = parseInt(start);
    const end = startLine + lines;
    return hasAddedLines ? new Range_1.Range(startLine, end) : null;
};
const getRangesForDiff = (diff) => diff.split("\n").reduce((ranges, line) => {
    if (!isHunkHeader(line))
        return ranges;
    const range = getRangeForChangedLines(line);
    return range ? [...ranges, range] : ranges;
}, []);
exports.getRangesForDiff = getRangesForDiff;
