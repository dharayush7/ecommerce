"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpiry = checkExpiry;
function checkExpiry(expiryDate) {
    const exprired = expiryDate.getTime() - Date.now() >= 0;
    return exprired;
}
