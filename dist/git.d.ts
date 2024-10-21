import { Range } from "./Range";
declare const getDiffForFile: (filePath: string) => string;
declare const getRangesForDiff: (diff: string) => Range[];
export { getDiffForFile, getRangesForDiff };
