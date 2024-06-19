"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItemController = exports.updateMenuItemController = exports.createMenuItemController = exports.getMenuItemByIdController = exports.getMenuItemController = void 0;
const menu_item_service_1 = require("./menu_item.service");
// get all menu item
const getMenuItemController = async (c) => {
    try {
        const item = await (0, menu_item_service_1.getMenuItemService)();
        if (item == null || item.length == 0) {
            return c.text("No menu item found", 404);
        }
        return c.json(item, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getMenuItemController = getMenuItemController;
// get menu item by id
const getMenuItemByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const item = await (0, menu_item_service_1.getMenuItemByIdService)(id);
        if (item == null) {
            return c.text("menu item not found", 404);
        }
        return c.json(item, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getMenuItemByIdController = getMenuItemByIdController;
// create menu item
const createMenuItemController = async (c) => {
    try {
        const item = await c.req.json();
        const newitem = await (0, menu_item_service_1.createMenuItemService)(item);
        if (!newitem)
            return c.text("menu_item not created", 400);
        return c.json({ message: newitem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createMenuItemController = createMenuItemController;
//  update menu item
const updateMenuItemController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const item = await c.req.json();
        // search for menu item by id
        const updateditem = await (0, menu_item_service_1.getMenuItemByIdService)(id);
        if (!updateditem === undefined)
            return c.text("menU_item not found", 404);
        // get data to menu item
        const res = await (0, menu_item_service_1.updateMenuItemService)(id, item);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateMenuItemController = updateMenuItemController;
// delete Menu item
const deleteMenuItemController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for menu item by id
        const item = await (0, menu_item_service_1.getMenuItemByIdService)(id);
        if (!item)
            return c.text("menu item not found", 404);
        // delete mennu item
        const res = await (0, menu_item_service_1.deleteMenuItemService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteMenuItemController = deleteMenuItemController;
