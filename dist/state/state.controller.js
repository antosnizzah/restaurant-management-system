"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStateController = exports.updateStateController = exports.createStateController = exports.getStateByIdController = exports.getStateController = void 0;
const state_service_1 = require("./state.service");
// get all State
const getStateController = async (c) => {
    try {
        const State = await (0, state_service_1.getStateService)();
        if (State == null || State.length == 0) {
            return c.text("No State  found", 404);
        }
        return c.json(State, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStateController = getStateController;
// get State  by id
const getStateByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const State = await (0, state_service_1.getStateByIdService)(id);
        if (State == null) {
            return c.text("State   not found", 404);
        }
        return c.json(State, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStateByIdController = getStateByIdController;
// create  State 
const createStateController = async (c) => {
    try {
        const State = await c.req.json();
        const newState = await (0, state_service_1.createStateService)(State);
        if (!newState)
            return c.text("State not created", 400);
        return c.json({ message: newState }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createStateController = createStateController;
//  update State 
const updateStateController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const State = await c.req.json();
        // search for  State  by id
        const updatedState = await (0, state_service_1.getStateByIdService)(id);
        if (!updatedState === undefined)
            return c.text("State  not found", 404);
        // get data to State 
        const res = await (0, state_service_1.updateStateService)(id, State);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateStateController = updateStateController;
// delete  State
const deleteStateController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for State by id
        const State = await (0, state_service_1.getStateByIdService)(id);
        if (!State)
            return c.text("State not found", 404);
        // delete order 
        const res = await (0, state_service_1.deleteStateService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteStateController = deleteStateController;
