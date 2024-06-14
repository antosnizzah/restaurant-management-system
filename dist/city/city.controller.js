"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityController = exports.updateCityController = exports.createCityController = exports.getCityByIdController = exports.getCityController = void 0;
const city_service_1 = require("./city.service");
// get all city
const getCityController = async (c) => {
    try {
        const city = await (0, city_service_1.getCityService)();
        if (city == null || city.length == 0) {
            return c.text("No city found", 404);
        }
        return c.json(city, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCityController = getCityController;
// get city by id
const getCityByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const city = await (0, city_service_1.getCityByIdService)(id);
        if (city == null) {
            return c.text("city not found", 404);
        }
        return c.json(city, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCityByIdController = getCityByIdController;
// create city
const createCityController = async (c) => {
    try {
        const city = await c.req.json();
        const newcity = await (0, city_service_1.createCityService)(city);
        if (!newcity)
            return c.text("city not created", 400);
        return c.json({ message: newcity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCityController = createCityController;
//  update city
const updateCityController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const city = await c.req.json();
        // search for user by id
        const updatedcity = await (0, city_service_1.getCityByIdService)(id);
        if (!updatedcity === undefined)
            return c.text("city not found", 404);
        // get data to update
        const res = await (0, city_service_1.updateCityService)(id, city);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCityController = updateCityController;
// delete city
const deleteCityController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for address by id
        const city = await (0, city_service_1.getCityByIdService)(id);
        if (!city)
            return c.text("city not found", 404);
        // delete address
        const res = await (0, city_service_1.deleteCityService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCityController = deleteCityController;
