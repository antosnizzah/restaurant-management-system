"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverController = exports.updateDriverController = exports.createDriverController = exports.getDriverByIdController = exports.getDriverController = void 0;
const driver_service_1 = require("./driver.service");
// get all driver
const getDriverController = async (c) => {
    try {
        const driver = await (0, driver_service_1.getDriverService)();
        if (driver == null || driver.length == 0) {
            return c.text("No driver found", 404);
        }
        return c.json(driver, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getDriverController = getDriverController;
// get driver by id
const getDriverByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const driver = await (0, driver_service_1.getDriverByIdService)(id);
        if (driver == null) {
            return c.text("driver not found", 404);
        }
        return c.json(driver, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getDriverByIdController = getDriverByIdController;
// create driver
const createDriverController = async (c) => {
    try {
        const driver = await c.req.json();
        const newdriver = await (0, driver_service_1.createDriverService)(driver);
        if (!newdriver)
            return c.text("driver not created", 400);
        return c.json({ message: newdriver }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createDriverController = createDriverController;
//  update comment
const updateDriverController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const driver = await c.req.json();
        // search for driver by id
        const updateddriver = await (0, driver_service_1.getDriverByIdService)(id);
        if (!updateddriver === undefined)
            return c.text("driver not found", 404);
        // get data to update
        const res = await (0, driver_service_1.updateDriverService)(id, driver);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateDriverController = updateDriverController;
// delete driver
const deleteDriverController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for driver by id
        const driver = await (0, driver_service_1.getDriverByIdService)(id);
        if (!driver)
            return c.text("driver not found", 404);
        // delete driver
        const res = await (0, driver_service_1.deleteDriverService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteDriverController = deleteDriverController;
