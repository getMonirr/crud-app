"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialUserValidationSchema = exports.userValidationSchema = exports.orderValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fullNameValidationSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
});
const addressValidationSchema = zod_1.default.object({
    street: zod_1.default.string().min(1).max(40),
    city: zod_1.default.string().min(1).max(30),
    country: zod_1.default.string().min(1).max(30),
});
exports.orderValidationSchema = zod_1.default.object({
    productName: zod_1.default.string(),
    quantity: zod_1.default.number(),
    price: zod_1.default.number(),
});
exports.userValidationSchema = zod_1.default.object({
    userId: zod_1.default.number(),
    username: zod_1.default.string(),
    password: zod_1.default.string(),
    fullName: fullNameValidationSchema,
    age: zod_1.default.number(),
    email: zod_1.default.string().email(),
    isActive: zod_1.default.boolean().default(false),
    hobbies: zod_1.default.array(zod_1.default.string()),
    address: addressValidationSchema,
    orders: zod_1.default.array(exports.orderValidationSchema).optional(),
});
exports.partialUserValidationSchema = exports.userValidationSchema.partial();
