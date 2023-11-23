"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./app/modulars/user/user.route"));
const errorMiddleware_1 = __importDefault(require("./app/middleware/errorMiddleware"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
// cors
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({ message: 'A2Crud server is running' });
});
app.use('/api/users', user_route_1.default);
// error handler
app.use(errorMiddleware_1.default);
exports.default = app;
