"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLink = void 0;
var ethers_1 = __importDefault(require("ethers"));
var generateLink = function (_a) {
    var factoryAddress = _a.factoryAddress, chain = _a.chain, claimHost = _a.claimHost, linkdropMasterAddress = _a.linkdropMasterAddress, signer = _a.signer, weiAmount = _a.weiAmount, tokenAddress = _a.tokenAddress, tokenAmount = _a.tokenAmount, expirationTime = _a.expirationTime, version = _a.version, campaignId = _a.campaignId, wallet = _a.wallet;
    return __awaiter(void 0, void 0, void 0, function () {
        var linkdropSigner;
        return __generator(this, function (_b) {
            if (factoryAddress === null || factoryAddress === '') {
                throw new Error('Please provide factory address');
            }
            if (!chain || chain === null || chain === '') {
                throw new Error('Please provide chainId');
            }
            if (claimHost === null || claimHost === '') {
                throw new Error('Please provide claim host');
            }
            if (linkdropMasterAddress === null || linkdropMasterAddress === '') {
                throw new Error("Please provide linkdrop master's address");
            }
            if (signer === null || signer === '') {
                throw new Error('Please provide signing key or wallet');
            }
            if (weiAmount === null || weiAmount === '') {
                throw new Error('Please provide amount of eth to claim');
            }
            if (tokenAddress === null || tokenAddress === '') {
                throw new Error('Please provide ERC20 token address');
            }
            if (tokenAmount === null || tokenAmount === '') {
                throw new Error('Please provide amount of tokens to claim');
            }
            if (expirationTime === null || expirationTime === '') {
                throw new Error('Please provide expiration time');
            }
            if (version === null || !version) {
                throw new Error('Please provide contract version');
            }
            if (campaignId === null || campaignId === '') {
                throw new Error('Please provide campaign id');
            }
            if (typeof signer === 'string') {
                linkdropSigner = new ethers_1.default.Wallet(signer);
            }
            else if (typeof signer === 'object') {
                linkdropSigner = signer;
            }
            return [2 /*return*/];
        });
    });
};
exports.generateLink = generateLink;
