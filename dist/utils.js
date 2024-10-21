"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMessages = void 0;
const filterMessages = (messages) => messages.sort((a, b) => b.message.length - a.message.length).slice(0, 5);
exports.filterMessages = filterMessages;
