"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getOrderMenuItemByIdService = exports.getOrderMenuItemService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL  ORDER MENU
const getOrderMenuItemService = async () => {
    const orderitem = await db_1.default.query.OrderMenuItemTable.findMany();
    return orderitem;
};
exports.getOrderMenuItemService = getOrderMenuItemService;
// GET ORDER MENU BY ID
const getOrderMenuItemByIdService = async (id) => {
    const orderitem = await db_1.default.query.OrderMenuItemTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderMenuItemTable.id, id)
    });
    return orderitem;
};
exports.getOrderMenuItemByIdService = getOrderMenuItemByIdService;
// CREATE ORDER MENU
const createOrderMenuItemService = async (item) => {
    await db_1.default.insert(schema_1.OrderMenuItemTable).values(item);
    return "order menu_item created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
//  UPDATE menu item
const updateOrderMenuItemService = async (id, item) => {
    await db_1.default.update(schema_1.OrderMenuItemTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItemTable.id, id));
    return "order menu_item updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
// DELETE menu item
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.OrderMenuItemTable).where((0, drizzle_orm_1.eq)(schema_1.OrderMenuItemTable.id, id));
    return "Order menu_item deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
