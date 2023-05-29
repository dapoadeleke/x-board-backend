"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static handle(err, req, res, next) {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.json({ status: 'error', message: err.message, stackTrace: err.stack });
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=error.handler.js.map