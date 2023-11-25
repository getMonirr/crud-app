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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
//* *********
// create a new user
//********* */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        //validate the user data
        const validatedData = user_validation_1.userValidationSchema.parse(userData);
        const result = yield user_service_1.userServices.createUser(validatedData);
        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'User creation failed',
                error: result,
            });
        }
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error,
        });
    }
});
//* *********
// get All users
//********* */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.userServices.getAllUsers();
        if (!users || (users === null || users === void 0 ? void 0 : users.length) <= 0) {
            return res.status(404).json({
                success: false,
                message: 'Users not found',
                error: {
                    code: 404,
                    description: 'Users not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to found users',
            error,
        });
    }
});
//* *********
// create a user
//********* */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.userServices.getUser(Number(req.params.userId));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to found user',
            error,
        });
    }
});
//* *********
// update a new user
//********* */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        // validate user data
        const validatedData = user_validation_1.partialUserValidationSchema.parse(userData);
        const updatedResult = yield user_service_1.userServices.updateUser(Number(req.params.userId), validatedData);
        if (!updatedResult) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: updatedResult,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to update user information',
            error,
        });
    }
});
//* *********
// delete a new user
//********* */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedResult = yield user_service_1.userServices.deleteUser(Number(req.params.userId));
        if (!deletedResult) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to delete a user',
            error,
        });
    }
});
// ----------------------------------------products-----------------------------------
//* *********
// add product into the order list
//********* */
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // validate order data
        const validatedData = user_validation_1.orderValidationSchema.parse(orderData);
        //result
        const addedResult = yield user_service_1.userServices.addOrder(Number(req.params.userId), validatedData);
        if (!addedResult) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to add orders',
            error,
        });
    }
});
//* *********
// get All orders for specified user
//********* */
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderResponse = yield user_service_1.userServices.getAllOrders(Number(req.params.userId));
        const orders = (orderResponse === null || orderResponse === void 0 ? void 0 : orderResponse.orders) || [];
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: { orders },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to get orders',
            data: error,
        });
    }
});
//* *********
// calculate the total price
//********* */
const calculateTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const price = yield user_service_1.userServices.calculateTotalPrice(Number(req.params.userId));
        if (!price) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: { totalPrice: price },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something is wrong to calculate the price',
            error,
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    calculateTotalPrice,
};
