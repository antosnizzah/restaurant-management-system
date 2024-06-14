"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrdersController = exports.updateOrdersController = exports.createOrdersController = exports.getOrdersByIdController = exports.getOrdersController = void 0;
const orders_service_1 = require("./orders.service");
// get all  orders
const getOrdersController = async (c) => {
    try {
        const ordersitem = await (0, orders_service_1.getOrdersService)();
        if (ordersitem == null || ordersitem.length == 0) {
            return c.text("No order  found", 404);
        }
        return c.json(ordersitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrdersController = getOrdersController;
// get order  by id
const getOrdersByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const ordersitem = await (0, orders_service_1.getOrdersByIdService)(id);
        if (ordersitem == null) {
            return c.text("order   not found", 404);
        }
        return c.json(ordersitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrdersByIdController = getOrdersByIdController;
// create  order 
const createOrdersController = async (c) => {
    try {
        const ordersitem = await c.req.json();
        const newordersitem = await (0, orders_service_1.createOrdersService)(ordersitem);
        if (!newordersitem)
            return c.text("order not created", 400);
        return c.json({ message: newordersitem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrdersController = createOrdersController;
//  update order 
const updateOrdersController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const ordersitem = await c.req.json();
        // search for  order  by id
        const updatedordersitem = await (0, orders_service_1.getOrdersByIdService)(id);
        if (!updatedordersitem === undefined)
            return c.text("order  not found", 404);
        // get data to order 
        const res = await (0, orders_service_1.updateOrdersService)(id, ordersitem);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrdersController = updateOrdersController;
// delete  order 
const deleteOrdersController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for  by id
        const ordersitem = await (0, orders_service_1.getOrdersByIdService)(id);
        if (!ordersitem)
            return c.text("order not found", 404);
        // delete order 
        const res = await (0, orders_service_1.deleteOrdersService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrdersController = deleteOrdersController;
