"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentService = exports.updateCommentService = exports.createCommentService = exports.getCommentByIdService = exports.getCommentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL comment
const getCommentService = async () => {
    const comment = await db_1.default.query.CommentTable.findMany();
    return comment;
};
exports.getCommentService = getCommentService;
// GET COMMENT BY ID
const getCommentByIdService = async (id) => {
    const comment = await db_1.default.query.CommentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id)
    });
    return comment;
};
exports.getCommentByIdService = getCommentByIdService;
// CREATE comment
const createCommentService = async (comment) => {
    await db_1.default.insert(schema_1.CommentTable).values(comment);
    return "comment created successfully";
};
exports.createCommentService = createCommentService;
//  UPDATE comment
const updateCommentService = async (id, comment) => {
    await db_1.default.update(schema_1.CommentTable).set(comment).where((0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id));
    return "comment updated successfully";
};
exports.updateCommentService = updateCommentService;
// DELETE comment
const deleteCommentService = async (id) => {
    await db_1.default.delete(schema_1.CommentTable).where((0, drizzle_orm_1.eq)(schema_1.CommentTable.id, id));
    return "comment deleted successfully";
};
exports.deleteCommentService = deleteCommentService;
