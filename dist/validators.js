"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateauthorizeUsersSchema = exports.authorizeUsersSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    "name": zod_1.z.string(),
    "contact_phone": zod_1.z.number(),
    "phone_verified": zod_1.z.boolean(),
    "email": zod_1.z.string(),
    "email_verified": zod_1.z.boolean(),
    "confirmation_code": zod_1.z.string(),
    "password": zod_1.z.string()
});
exports.authorizeUsersSchema = zod_1.z.object({
    "username": zod_1.z.string(),
    "password": zod_1.z.string(),
    "user_id": zod_1.z.number()
});
exports.updateauthorizeUsersSchema = zod_1.z.object({
    "id": zod_1.z.number(),
    "username": zod_1.z.string(),
    "password": zod_1.z.string(),
    "user_id": zod_1.z.number().optional()
});
