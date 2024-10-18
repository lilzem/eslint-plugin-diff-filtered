import * as child_process from "child_process";
import { resolve } from "path";
import { Range } from "./Range";

const COMMAND = "git";
const OPTIONS = { maxBuffer: 1024 * 1024 * 100 };

const getDiffForFile = (filePath: string): string => {
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
    resolve(filePath),
  ];

  return child_process.execFileSync(COMMAND, args, OPTIONS).toString();
};

const isHunkHeader = (input: string) => /^@@ [^@]* @@/u.exec(input);

const getRangeForChangedLines = (line: string) => {
  const rangeRE = /^@@ .* \+(?<start>\d+)(?<linesCountDelimiter>,(?<linesCount>\d+))? @@/u;
  const range = rangeRE.exec(line);
  if (!range) throw Error(`Couldn't match regex with line '${line}'`);

  const { start = "0", linesCountDelimiter = ",0", linesCount = "0" } = range.groups ?? {};
  const lines = linesCountDelimiter && linesCount ? parseInt(linesCount) : 1;
  const hasAddedLines = lines !== 0;
  const startLine = parseInt(start);
  const end = startLine + lines;

  return hasAddedLines ? new Range(startLine, end) : null;
};

const getRangesForDiff = (diff: string): Range[] =>
  diff.split("\n").reduce<Range[]>((ranges, line) => {
    if (!isHunkHeader(line)) return ranges;
    const range = getRangeForChangedLines(line);
    return range ? [...ranges, range] : ranges;
  }, []);

export { getDiffForFile, getRangesForDiff };
