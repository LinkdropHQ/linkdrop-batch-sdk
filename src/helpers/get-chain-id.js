"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainId = void 0;
var getChainId = function (network) {
    switch (network) {
        case 'mainnet':
            return 1;
        case 'polygon':
            return 137;
    }
};
exports.getChainId = getChainId;
