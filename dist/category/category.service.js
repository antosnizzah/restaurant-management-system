"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryByIdService = exports.getCategoryService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL category
const getCategoryService = async () => {
    const category = await db_1.default.query.CategoryTable.findMany();
    return category;
};
exports.getCategoryService = getCategoryService;
// GET category BY ID
const getCategoryByIdService = async (id) => {
    const category = await db_1.default.query.CategoryTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CategoryTable.id, id)
    });
    return category;
};
exports.getCategoryByIdService = getCategoryByIdService;
// CREATE category
const createCategoryService = async (category) => {
    await db_1.default.insert(schema_1.CategoryTable).values(category);
    return "category created successfully";
};
exports.createCategoryService = createCategoryService;
//  UPDATE category
const updateCategoryService = async (id, address) => {
    await db_1.default.update(schema_1.CategoryTable).set(address).where((0, drizzle_orm_1.eq)(schema_1.CategoryTable.id, id));
    return "category updated successfully";
};
exports.updateCategoryService = updateCategoryService;
// DELETE category
const deleteCategoryService = async (id) => {
    await db_1.default.delete(schema_1.CategoryTable).where((0, drizzle_orm_1.eq)(schema_1.CategoryTable.id, id));
    return "category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
