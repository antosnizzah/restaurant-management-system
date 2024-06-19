"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.createCityService = exports.getCityByIdService = exports.getCityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// GET ALL city
const getCityService = async () => {
    const city = await db_1.default.query.CityTable.findMany();
    return city;
};
exports.getCityService = getCityService;
// GET CITY BY ID
const getCityByIdService = async (id) => {
    const city = await db_1.default.query.CityTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CityTable.id, id)
    });
    return city;
};
exports.getCityByIdService = getCityByIdService;
// CREATE city
const createCityService = async (city) => {
    await db_1.default.insert(schema_1.CityTable).values(city);
    return "city created successfully";
};
exports.createCityService = createCityService;
//  UPDATE city
const updateCityService = async (id, city) => {
    await db_1.default.update(schema_1.CityTable).set(city).where((0, drizzle_orm_1.eq)(schema_1.CityTable.id, id));
    return "city updated successfully";
};
exports.updateCityService = updateCityService;
// DELETE ADDRESS
const deleteCityService = async (id) => {
    await db_1.default.delete(schema_1.CityTable).where((0, drizzle_orm_1.eq)(schema_1.CityTable.id, id));
    return "city deleted successfully";
};
exports.deleteCityService = deleteCityService;
