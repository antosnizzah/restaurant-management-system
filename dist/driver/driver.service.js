"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getDriverByIdService = exports.getDriverService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL driver
const getDriverService = async () => {
    const driver = await db_1.default.query.DriverTable.findMany();
    return driver;
};
exports.getDriverService = getDriverService;
// GET DRIVER BY ID
const getDriverByIdService = async (id) => {
    const driver = await db_1.default.query.DriverTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.DriverTable.id, id)
    });
    return driver;
};
exports.getDriverByIdService = getDriverByIdService;
// CREATE DRIVER
const createDriverService = async (driver) => {
    await db_1.default.insert(schema_1.DriverTable).values(driver);
    return "driver created successfully";
};
exports.createDriverService = createDriverService;
//  UPDATE driver
const updateDriverService = async (id, driver) => {
    await db_1.default.update(schema_1.DriverTable).set(driver).where((0, drizzle_orm_1.eq)(schema_1.DriverTable.id, id));
    return "driver updated successfully";
};
exports.updateDriverService = updateDriverService;
// DELETE driver
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.DriverTable).where((0, drizzle_orm_1.eq)(schema_1.DriverTable.id, id));
    return "driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;
