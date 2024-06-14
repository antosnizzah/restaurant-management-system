"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authupdateRouter = exports.authRouter = void 0;
const hono_1 = require("hono");
const validators_1 = require("../validators");
const auth_controller_1 = require("./auth.controller");
const auth_controller_2 = require("./auth.controller");
// import { updateAuthorizeUsersController } from "./auth.controller";
const zod_validator_1 = require("@hono/zod-validator");
exports.authRouter = new hono_1.Hono();
exports.authupdateRouter = new hono_1.Hono();
exports.authRouter.post("/register", (0, zod_validator_1.zValidator)('json', validators_1.authorizeUsersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.createAuthorizeUsersController);
// authRouter.put("/update/auth/:id", zValidator('json', updateauthorizeUsersSchema, (result, c) => {
//     if (!result.success) {
//         return c.json(result.error, 400);
//     }
// }), updateAuthorizeUsersController);
exports.authRouter.post("/login", auth_controller_2.UserLoginController);
