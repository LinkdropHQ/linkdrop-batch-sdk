"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccount = void 0;
var ethers_1 = require("ethers");
var generateAccount = function () {
    return ethers_1.ethers.Wallet.createRandom();
};
exports.generateAccount = generateAccount;
