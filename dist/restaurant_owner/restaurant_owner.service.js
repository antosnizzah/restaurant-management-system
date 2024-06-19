"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.createRestaurantOwnerService = exports.getRestaurantOwnerByIdService = exports.getRestaurantOwnerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL Restaurant Owner
const getRestaurantOwnerService = async () => {
    const restaurantOwner = await db_1.default.query.RestaurantOwnerTable.findMany();
    return restaurantOwner;
};
exports.getRestaurantOwnerService = getRestaurantOwnerService;
// GET Restaurant Owner  BY ID
const getRestaurantOwnerByIdService = async (id) => {
    const restaurantOwner = await db_1.default.query.RestaurantOwnerTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.RestaurantOwnerTable.id, id)
    });
    return restaurantOwner;
};
exports.getRestaurantOwnerByIdService = getRestaurantOwnerByIdService;
// CREATE Restaurant Owner
const createRestaurantOwnerService = async (item) => {
    await db_1.default.insert(schema_1.RestaurantOwnerTable).values(item);
    return "Restaurant Owner created successfully";
};
exports.createRestaurantOwnerService = createRestaurantOwnerService;
//  UPDATE Restaurant Owner
const updateRestaurantOwnerService = async (id, item) => {
    await db_1.default.update(schema_1.RestaurantOwnerTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwnerTable.id, id));
    return "Restaurant Owner updated successfully";
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
// DELETE Restaurant Owner
const deleteRestaurantOwnerService = async (id) => {
    await db_1.default.delete(schema_1.RestaurantOwnerTable).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwnerTable.id, id));
    return "Restaurant Owner deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
