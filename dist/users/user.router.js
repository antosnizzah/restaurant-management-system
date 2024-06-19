"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
const user_controller_1 = require("./user.controller");
exports.userRouter = new hono_1.Hono();
exports.userRouter.get('/user/:userId/comments', user_controller_1.handleGetUserComments);
exports.userRouter.get("user", bearAuth_1.adminuserAuth, user_controller_1.getUsersController);
exports.userRouter.get("/user/:id", user_controller_1.getUsersByIdController);
exports.userRouter.post("/user", (0, zod_validator_1.zValidator)("json", validators_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), user_controller_1.createUsersController);
exports.userRouter.delete("/user/:id", user_controller_1.deleteUsersController);
exports.userRouter.put("/user/:id", user_controller_1.updateUsersController);
