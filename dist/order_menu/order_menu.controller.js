"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemController = exports.updateOrderMenuItemController = exports.createOrderMenuItemController = exports.getOrderMenuItemByIdController = exports.getOrderMenuItemController = void 0;
const order_menu_service_1 = require("./order_menu.service");
// get all  order menu item
const getOrderMenuItemController = async (c) => {
    try {
        const orderitem = await (0, order_menu_service_1.getOrderMenuItemService)();
        if (orderitem == null || orderitem.length == 0) {
            return c.text("No order menu item found", 404);
        }
        return c.json(orderitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderMenuItemController = getOrderMenuItemController;
// get order menu item by id
const getOrderMenuItemByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderitem = await (0, order_menu_service_1.getOrderMenuItemByIdService)(id);
        if (orderitem == null) {
            return c.text("order menu item not found", 404);
        }
        return c.json(orderitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderMenuItemByIdController = getOrderMenuItemByIdController;
// create  order menu item
const createOrderMenuItemController = async (c) => {
    try {
        const orderitem = await c.req.json();
        const neworderitem = await (0, order_menu_service_1.createOrderMenuItemService)(orderitem);
        if (!neworderitem)
            return c.text("order menu_item not created", 400);
        return c.json({ message: neworderitem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderMenuItemController = createOrderMenuItemController;
//  update order menu item
const updateOrderMenuItemController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderitem = await c.req.json();
        // search for  order menu item by id
        const updatedorderitem = await (0, order_menu_service_1.getOrderMenuItemByIdService)(id);
        if (!updatedorderitem === undefined)
            return c.text("order menU_item not found", 404);
        // get data to order menu item
        const res = await (0, order_menu_service_1.updateOrderMenuItemService)(id, orderitem);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderMenuItemController = updateOrderMenuItemController;
// delete  order Menu item
const deleteOrderMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for menu item by id
        const orderitem = await (0, order_menu_service_1.getOrderMenuItemByIdService)(id);
        if (!orderitem)
            return c.text("order menu item not found", 404);
        // delete order menu item
        const res = await (0, order_menu_service_1.deleteOrderMenuItemService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderMenuItemController = deleteOrderMenuItemController;
