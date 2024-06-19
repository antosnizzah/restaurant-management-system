"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantController = exports.updateRestaurantController = exports.createRestaurantController = exports.getRestaurantByIdController = exports.getRestaurantController = void 0;
const restaurant_service_1 = require("./restaurant.service");
// get all  Restaurant
const getRestaurantController = async (c) => {
    try {
        const restaurant = await (0, restaurant_service_1.getRestaurantService)();
        if (restaurant == null || restaurant.length == 0) {
            return c.text("No Restaurant  found", 404);
        }
        return c.json(restaurant, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantController = getRestaurantController;
// get Restaurant  by id
const getRestaurantByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (restaurant == null) {
            return c.text("Restaurant  not found", 404);
        }
        return c.json(restaurant, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantByIdController = getRestaurantByIdController;
// create Restaurant
const createRestaurantController = async (c) => {
    try {
        const restaurant = await c.req.json();
        const newrestaurant = await (0, restaurant_service_1.createRestaurantService)(restaurant);
        if (!newrestaurant)
            return c.text("Restaurant not created", 400);
        return c.json({ message: newrestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createRestaurantController = createRestaurantController;
//  update Restaurant
const updateRestaurantController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const restaurant = await c.req.json();
        // search for Restaurant  by id
        const updatedrestaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (!updatedrestaurant === undefined)
            return c.text("Restaurant  not found", 404);
        // get data to Restaurant 
        const res = await (0, restaurant_service_1.updateRestaurantService)(id, restaurant);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateRestaurantController = updateRestaurantController;
// delete  Restaurant 
const deleteRestaurantController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for  by id
        const restaurant = await (0, restaurant_service_1.getRestaurantByIdService)(id);
        if (!restaurant)
            return c.text("Restaurant not found", 404);
        // delete Restaurant 
        const res = await (0, restaurant_service_1.deleteRestaurantService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteRestaurantController = deleteRestaurantController;
