"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processors = exports.configs = void 0;
const processors_1 = require("./processors");
const configs = {
    diff: processors_1.diffConfig,
};
exports.configs = configs;
const processors = { diff: processors_1.diff };
exports.processors = processors;
module.exports = { configs, processors };
