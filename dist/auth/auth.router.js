"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authupdateRouter = exports.authRouter = void 0;
const hono_1 = require("hono");
const validators_1 = require("../validators");
const auth_controller_1 = require("./auth.controller");
const auth_controller_2 = require("./auth.controller");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_orm_2 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const zod_validator_1 = require("@hono/zod-validator");
exports.authRouter = new hono_1.Hono();
exports.authupdateRouter = new hono_1.Hono();
exports.authRouter.post("/register", (0, zod_validator_1.zValidator)('json', validators_1.authorizeUsersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), auth_controller_1.createAuthorizeUsersController);
exports.authRouter.post("/login", auth_controller_2.UserLoginController);
exports.authRouter.get("/verify", async (c) => {
    const token = c.req.query('token');
    if (!token) {
        return c.json({ error: "Token is missing" }, 400);
    }
    const user = await db_1.default.query.AuthorizeUsersTable.findFirst({
        where: (0, drizzle_orm_2.sql) `${schema_1.AuthorizeUsersTable.verificationToken} = ${token}`
    });
    if (!user) {
        return c.json({ error: "Invalid token" }, 400);
    }
    // Update user to mark as verified
    await db_1.default.update(schema_1.AuthorizeUsersTable)
        .set({ verified: true })
        .where((0, drizzle_orm_1.eq)(schema_1.AuthorizeUsersTable.verificationToken, token));
    return c.json({ message: "Email verified successfully" }, 200);
});
