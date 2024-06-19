"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusController = exports.updateOrderStatusController = exports.createOrderStatusController = exports.getOrderStatusByIdController = exports.getOrderStatusController = void 0;
const order_status_service_1 = require("./order_status.service");
// get all  orders status
const getOrderStatusController = async (c) => {
    try {
        const orderstatusitem = await (0, order_status_service_1.getOrderStatusService)();
        if (orderstatusitem == null || orderstatusitem.length == 0) {
            return c.text("No order status found", 404);
        }
        return c.json(orderstatusitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderStatusController = getOrderStatusController;
// get order status  by id
const getOrderStatusByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const orderstatusitem = await (0, order_status_service_1.getOrderStatusByIdService)(id);
        if (orderstatusitem == null) {
            return c.text("order status  not found", 404);
        }
        return c.json(orderstatusitem, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getOrderStatusByIdController = getOrderStatusByIdController;
// create  order status
const createOrderStatusController = async (c) => {
    try {
        const orderstatusitem = await c.req.json();
        const neworderstatusitem = await (0, order_status_service_1.createOrderStatusService)(orderstatusitem);
        if (!neworderstatusitem)
            return c.text("order status not created", 400);
        return c.json({ message: neworderstatusitem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createOrderStatusController = createOrderStatusController;
//  update order status
const updateOrderStatusController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const orderstatusitem = await c.req.json();
        // search for  order  by id
        const updatedordersitem = await (0, order_status_service_1.getOrderStatusByIdService)(id);
        if (!updatedordersitem === undefined)
            return c.text("order  not found", 404);
        // get data to order status
        const res = await (0, order_status_service_1.updateOrderStatusService)(id, orderstatusitem);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateOrderStatusController = updateOrderStatusController;
// delete  order status
const deleteOrderStatusController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for order status by id
        const orderstatusitem = await (0, order_status_service_1.getOrderStatusByIdService)(id);
        if (!orderstatusitem)
            return c.text("order status not found", 404);
        // delete order status
        const res = await (0, order_status_service_1.deleteOrderStatusService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteOrderStatusController = deleteOrderStatusController;
