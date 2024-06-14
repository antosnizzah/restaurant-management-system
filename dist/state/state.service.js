"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateService = exports.updateStateService = exports.createStateService = exports.getStateByIdService = exports.getStateService = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
// GET ALL  State 
const getStateService = async () => {
    const State = await db_1.default.query.StateTable.findMany();
    return State;
};
exports.getStateService = getStateService;
// GET State BY ID
const getStateByIdService = async (id) => {
    const State = await db_1.default.query.StateTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.StateTable.id, id)
    });
    return State;
};
exports.getStateByIdService = getStateByIdService;
// CREATE State
const createStateService = async (item) => {
    await db_1.default.insert(schema_1.StateTable).values(item);
    return "State created successfully";
};
exports.createStateService = createStateService;
//  UPDATE State
const updateStateService = async (id, item) => {
    await db_1.default.update(schema_1.StateTable).set(item).where((0, drizzle_orm_1.eq)(schema_1.StateTable.id, id));
    return "State  updated successfully";
};
exports.updateStateService = updateStateService;
// DELETE State
const deleteStateService = async (id) => {
    await db_1.default.delete(schema_1.StateTable).where((0, drizzle_orm_1.eq)(schema_1.StateTable.id, id));
    return "State  deleted successfully";
};
exports.deleteStateService = deleteStateService;
