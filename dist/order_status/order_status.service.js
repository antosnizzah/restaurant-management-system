"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.createOrderStatusService = exports.getOrderStatusByIdService = exports.getOrderStatusService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL  ORDER STATUS
const getOrderStatusService = async () => {
    const orderstatusitem = await db_1.default.query.OrderStatusTable.findMany();
    return orderstatusitem;
};
exports.getOrderStatusService = getOrderStatusService;
// GET ORDER STATUS BY ID
const getOrderStatusByIdService = async (id) => {
    const orderstatusitem = await db_1.default.query.OrderStatusTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.OrderStatusTable.id, id)
    });
    return orderstatusitem;
};
exports.getOrderStatusByIdService = getOrderStatusByIdService;
// CREATE ORDER STATUS
const createOrderStatusService = async (item) => {
    await db_1.default.insert(schema_1.OrderStatusTable).values(item);
    return "order status  created successfully";
};
exports.createOrderStatusService = createOrderStatusService;
//  UPDATE order status
const updateOrderStatusService = async (id, item) => {
    await db_1.default.update(schema_1.OrderStatusTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.OrderStatusTable.id, id));
    return "order status updated successfully";
};
exports.updateOrderStatusService = updateOrderStatusService;
// DELETE order
const deleteOrderStatusService = async (id) => {
    await db_1.default.delete(schema_1.OrderStatusTable).where((0, drizzle_orm_1.eq)(schema_1.OrderStatusTable.id, id));
    return "Order status deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
