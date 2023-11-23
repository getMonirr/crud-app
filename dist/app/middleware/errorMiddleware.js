"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    res.status(errorStatus).send(errorMessage);
};
exports.default = errorMiddleware;
