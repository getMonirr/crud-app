"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
// user routes
userRouter.post('/', user_controller_1.userController.createUser);
userRouter.get('/', user_controller_1.userController.getAllUsers);
userRouter.get('/:userId', user_controller_1.userController.getUser);
userRouter.put('/:userId', user_controller_1.userController.updateUser);
userRouter.delete('/:userId', user_controller_1.userController.deleteUser);
// // orders
userRouter.put('/:userId/orders', user_controller_1.userController.addOrder);
userRouter.get('/:userId/orders', user_controller_1.userController.getAllOrders);
userRouter.get('/:userId/orders/total-price', user_controller_1.userController.calculateTotalPrice);
exports.default = userRouter;
