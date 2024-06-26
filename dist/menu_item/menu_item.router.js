"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemRouter = void 0;
const hono_1 = require("hono");
const menu_item_controller_1 = require("./menu_item.controller");
exports.MenuItemRouter = new hono_1.Hono();
exports.MenuItemRouter.get("/menu_item/:id", menu_item_controller_1.getMenuItemByIdController);
exports.MenuItemRouter.get("/menu_item", menu_item_controller_1.getMenuItemController);
exports.MenuItemRouter.post("/menu_item", menu_item_controller_1.createMenuItemController);
exports.MenuItemRouter.put("/menu_item/:id", menu_item_controller_1.updateMenuItemController);
exports.MenuItemRouter.delete("/menu_item/:id", menu_item_controller_1.deleteMenuItemController);
