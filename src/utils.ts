import { Linter } from "eslint";

export const filterMessages = (messages: Linter.LintMessage[]): Linter.LintMessage[] => 
    messages.sort((a, b) => b.message.length - a.message.length).slice(0, 5);
