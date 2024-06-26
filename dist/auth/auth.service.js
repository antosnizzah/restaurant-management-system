"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthorizeUsersService = void 0;
const schema_1 = require("../drizzle/schema");
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
// create a authorization service
const createAuthorizeUsersService = async (user) => {
    await db_1.default.insert(schema_1.AuthorizeUsersTable).values(user);
    return "user created successfully";
};
exports.createAuthorizeUsersService = createAuthorizeUsersService;
// create a login service
const userLoginService = async (user) => {
    const { username, password } = user;
    return await db_1.default.query.AuthorizeUsersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.AuthorizeUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                    id: true
                }
            }
        }
    });
};
exports.userLoginService = userLoginService;
