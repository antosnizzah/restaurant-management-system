"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getRestaurantByIdService = exports.getRestaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL Restaurant
const getRestaurantService = async () => {
    const restaurant = await db_1.default.query.RestaurantTable.findMany();
    return restaurant;
};
exports.getRestaurantService = getRestaurantService;
// GET Restaurant  BY ID
const getRestaurantByIdService = async (id) => {
    const restaurant = await db_1.default.query.RestaurantTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.RestaurantTable.id, id)
    });
    return restaurant;
};
exports.getRestaurantByIdService = getRestaurantByIdService;
// CREATE Restaurant
const createRestaurantService = async (item) => {
    await db_1.default.insert(schema_1.RestaurantTable).values(item);
    return "Restaurant created successfully";
};
exports.createRestaurantService = createRestaurantService;
//  UPDATE Restaurant
const updateRestaurantService = async (id, item) => {
    await db_1.default.update(schema_1.RestaurantTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.RestaurantTable.id, id));
    return "Restaurant updated successfully";
};
exports.updateRestaurantService = updateRestaurantService;
// DELETE Restaurant
const deleteRestaurantService = async (id) => {
    await db_1.default.delete(schema_1.RestaurantTable).where((0, drizzle_orm_1.eq)(schema_1.RestaurantTable.id, id));
    return "Restaurant  deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
