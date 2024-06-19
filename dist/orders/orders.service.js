"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrdersService = exports.updateOrdersService = exports.createOrdersService = exports.getOrdersByIdService = exports.getOrdersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL  ORDER 
const getOrdersService = async () => {
    const ordersitem = await db_1.default.query.OrdersTable.findMany();
    return ordersitem;
};
exports.getOrdersService = getOrdersService;
// GET ORDER  BY ID
const getOrdersByIdService = async (id) => {
    const ordersitem = await db_1.default.query.OrdersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrdersTable.id, id)
    });
    return ordersitem;
};
exports.getOrdersByIdService = getOrdersByIdService;
// CREATE ORDER MENU
const createOrdersService = async (item) => {
    await db_1.default.insert(schema_1.OrdersTable).values(item);
    return "order  created successfully";
};
exports.createOrdersService = createOrdersService;
//  UPDATE order
const updateOrdersService = async (id, item) => {
    await db_1.default.update(schema_1.OrdersTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.OrdersTable.id, id));
    return "order  updated successfully";
};
exports.updateOrdersService = updateOrdersService;
// DELETE order
const deleteOrdersService = async (id) => {
    await db_1.default.delete(schema_1.OrdersTable).where((0, drizzle_orm_1.eq)(schema_1.OrdersTable.id, id));
    return "Order  deleted successfully";
};
exports.deleteOrdersService = deleteOrdersService;
