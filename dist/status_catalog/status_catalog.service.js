"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogService = exports.updateStatusCatalogService = exports.createStatusCatalogService = exports.getStatusCatalogByIdService = exports.getStatusCatalogService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL StatusCatalog  
const getStatusCatalogService = async () => {
    const StatusCatalog = await db_1.default.query.StatusCatalogTable.findMany();
    return StatusCatalog;
};
exports.getStatusCatalogService = getStatusCatalogService;
// GET StatusCatalog   BY ID
const getStatusCatalogByIdService = async (id) => {
    const StatusCatalog = await db_1.default.query.StatusCatalogTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.StatusCatalogTable.id, id)
    });
    return StatusCatalog;
};
exports.getStatusCatalogByIdService = getStatusCatalogByIdService;
// CREATE ORDER MENU
const createStatusCatalogService = async (item) => {
    await db_1.default.insert(schema_1.StatusCatalogTable).values(item);
    return "StatusCatalog created successfully";
};
exports.createStatusCatalogService = createStatusCatalogService;
//  UPDATE order
const updateStatusCatalogService = async (id, item) => {
    await db_1.default.update(schema_1.StatusCatalogTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.StatusCatalogTable.id, id));
    return "StatusCatalog  updated successfully";
};
exports.updateStatusCatalogService = updateStatusCatalogService;
// DELETE order
const deleteStatusCatalogService = async (id) => {
    await db_1.default.delete(schema_1.StatusCatalogTable).where((0, drizzle_orm_1.eq)(schema_1.StatusCatalogTable.id, id));
    return "StatusCatalog  deleted successfully";
};
exports.deleteStatusCatalogService = deleteStatusCatalogService;
