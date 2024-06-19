"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerController = exports.updateRestaurantOwnerController = exports.createRestaurantOwnerController = exports.getRestaurantOwnerByIdController = exports.getRestaurantOwnerController = void 0;
const restaurant_owner_service_1 = require("./restaurant_owner.service");
// get all  Restaurant Owner
const getRestaurantOwnerController = async (c) => {
    try {
        const restaurantOwner = await (0, restaurant_owner_service_1.getRestaurantOwnerService)();
        if (restaurantOwner == null || restaurantOwner.length == 0) {
            return c.text("No Restaurant Owner found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantOwnerController = getRestaurantOwnerController;
// get Restaurant Owner by id
const getRestaurantOwnerByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const restaurantOwner = await (0, restaurant_owner_service_1.getRestaurantOwnerByIdService)(id);
        if (restaurantOwner == null) {
            return c.text("Restaurant Owner not found", 404);
        }
        return c.json(restaurantOwner, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getRestaurantOwnerByIdController = getRestaurantOwnerByIdController;
// create Restaurant Owner
const createRestaurantOwnerController = async (c) => {
    try {
        const restaurantOwner = await c.req.json();
        const newrestaurantOwner = await (0, restaurant_owner_service_1.createRestaurantOwnerService)(restaurantOwner);
        if (!newrestaurantOwner)
            return c.text("RestaurantOwner not created", 400);
        return c.json({ message: newrestaurantOwner }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createRestaurantOwnerController = createRestaurantOwnerController;
//  update Restaurant Owner
const updateRestaurantOwnerController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const restaurantOwner = await c.req.json();
        // search for Restaurant Owner  by id
        const updatedrestaurantOwner = await (0, restaurant_owner_service_1.getRestaurantOwnerByIdService)(id);
        if (!updatedrestaurantOwner === undefined)
            return c.text("RestaurantOwner  not found", 404);
        // get data to Restaurant Owner
        const res = await (0, restaurant_owner_service_1.updateRestaurantOwnerService)(id, restaurantOwner);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateRestaurantOwnerController = updateRestaurantOwnerController;
// delete  Restaurant 
const deleteRestaurantOwnerController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for  by id
        const restaurantOwner = await (0, restaurant_owner_service_1.getRestaurantOwnerByIdService)(id);
        if (!restaurantOwner)
            return c.text("Restaurant  Owner not found", 404);
        // delete Restaurant 
        const res = await (0, restaurant_owner_service_1.deleteRestaurantOwnerService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteRestaurantOwnerController = deleteRestaurantOwnerController;
