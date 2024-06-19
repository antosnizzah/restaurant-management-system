"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemService = exports.updateMenuItemService = exports.createMenuItemService = exports.getMenuItemByIdService = exports.getMenuItemService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL menu item
const getMenuItemService = async () => {
    const item = await db_1.default.query.MenuItemTable.findMany();
    return item;
};
exports.getMenuItemService = getMenuItemService;
// GET menu item BY ID
const getMenuItemByIdService = async (id) => {
    const item = await db_1.default.query.MenuItemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.MenuItemTable.id, id)
    });
    return item;
};
exports.getMenuItemByIdService = getMenuItemByIdService;
// CREATE menu item
const createMenuItemService = async (item) => {
    await db_1.default.insert(schema_1.MenuItemTable).values(item);
    return "menu_item created successfully";
};
exports.createMenuItemService = createMenuItemService;
//  UPDATE menu item
const updateMenuItemService = async (id, item) => {
    await db_1.default.update(schema_1.MenuItemTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.MenuItemTable.id, id));
    return "menu_item updated successfully";
};
exports.updateMenuItemService = updateMenuItemService;
// DELETE menu item
const deleteMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.MenuItemTable).where((0, drizzle_orm_1.eq)(schema_1.MenuItemTable.id, id));
    return "menu_item deleted successfully";
};
exports.deleteMenuItemService = deleteMenuItemService;
