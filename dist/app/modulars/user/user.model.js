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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// full name schema
const fullNameSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
});
// address schema
const addressSchema = new mongoose_1.default.Schema({
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
});
// order schema
const orderSchema = new mongoose_1.default.Schema({
    price: { type: Number, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
});
// user schema
const userSchema = new mongoose_1.default.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: fullNameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    hobbies: [String],
    address: {
        type: addressSchema,
        required: true,
    },
    orders: [orderSchema],
});
// instance methods for check user existence
userSchema.methods.isUserExists = function (userName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ username: userName });
    });
};
// static methods for check user existence
userSchema.static('createIsUserExists', function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield User.findOne({ userId });
    });
});
// remove password, _id in response
userSchema.methods.toJSON = function () {
    var _a, _b;
    const obj = this.toObject();
    obj === null || obj === void 0 ? true : delete obj.password;
    obj === null || obj === void 0 ? true : delete obj._id;
    (_a = obj === null || obj === void 0 ? void 0 : obj.fullName) === null || _a === void 0 ? true : delete _a._id;
    (_b = obj === null || obj === void 0 ? void 0 : obj.address) === null || _b === void 0 ? true : delete _b._id;
    obj === null || obj === void 0 ? true : delete obj.__v;
    obj === null || obj === void 0 ? true : delete obj.orders;
    return obj;
};
// password hashed
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(this.password, Number(config_1.default.salt_round));
        this.password = hashedPassword;
        next();
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
