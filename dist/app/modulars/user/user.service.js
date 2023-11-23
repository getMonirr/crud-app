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
exports.userServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
// create a new user into the database
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default(userData);
    const isUserExist = yield newUser.isUserExists(userData.username);
    if (isUserExist) {
        throw new Error(`User ${userData.username} already exists`);
    }
    return yield newUser.save();
});
// get all users from the database
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find().select({
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,
        _id: 0,
    });
});
// get a user from the database
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.createIsUserExists(userId);
});
// update a user
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.createIsUserExists(userId);
    if (!isUserExist)
        return null;
    return yield user_model_1.default.findOneAndUpdate({ userId }, updateData, { new: true });
});
// delete a user from the database
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.createIsUserExists(userId);
    if (!isUserExist)
        return null;
    return yield user_model_1.default.findOneAndDelete({ userId });
});
// products
const addOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // find user first
    const isUserExist = yield user_model_1.default.createIsUserExists(userId);
    if (!isUserExist)
        return null;
    return yield user_model_1.default.findOneAndUpdate({ userId }, { $addToSet: { orders: { $each: [orderData] } } }, { new: true });
});
// get all orders
const getAllOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.createIsUserExists(userId);
    if (!isUserExist)
        return null;
    const result = yield user_model_1.default.findOne({ userId }).select({ orders: 1, _id: 0 });
    const orders = (result === null || result === void 0 ? void 0 : result.orders) || [];
    return { orders };
});
// calculate total price
const calculateTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.default.createIsUserExists(userId);
    if (!isUserExist) {
        // TODO: think about the response for user does not exist
        return 0;
    }
    const calculateResult = yield user_model_1.default.aggregate([
        { $match: { userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: '$orders.price' },
            },
        },
    ]);
    if (calculateResult.length > 0)
        return calculateResult[0].totalPrice;
    else
        return 0;
});
exports.userServices = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    calculateTotalPrice,
};
