"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserComments = exports.deleteUsersService = exports.updateUsersService = exports.createUsersService = exports.getUsersByIdService = exports.getUsersService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const schema_2 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL Users with a limit
const getUsersService = async (limit) => {
    const Users = await db_1.default.query.UsersTable.findMany({
        limit: limit
    });
    return Users;
};
exports.getUsersService = getUsersService;
// GET Users BY ID
const getUsersByIdService = async (id) => {
    const Users = await db_1.default.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.UsersTable.id, id),
        columns: {
            name: true,
            contact_phone: true,
            email: true
        }
    });
};
exports.getUsersByIdService = getUsersByIdService;
// CREATE Users
const createUsersService = async (item) => {
    await db_1.default.insert(schema_1.UsersTable).values(item);
    return "User created successfully";
};
exports.createUsersService = createUsersService;
//  UPDATE Users
const updateUsersService = async (id, item) => {
    await db_1.default.update(schema_1.UsersTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.id, id));
    return "User  updated successfully";
};
exports.updateUsersService = updateUsersService;
// DELETE Users
const deleteUsersService = async (id) => {
    await db_1.default.delete(schema_1.UsersTable).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.id, id));
    return "User  deleted successfully";
};
exports.deleteUsersService = deleteUsersService;
// user getting his/her comment
const getUserComments = async (userId) => {
    const userComments = await db_1.default
        .select()
        .from(schema_2.CommentTable)
        .where((0, drizzle_orm_1.eq)(schema_2.CommentTable.user_id, userId))
        .execute();
    return userComments;
};
exports.getUserComments = getUserComments;
