"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const restaurant_owner_controller_1 = require("./restaurant_owner.controller");
exports.RestaurantOwnerRouter = new hono_1.Hono();
exports.RestaurantOwnerRouter.get("/restaurant_owner", restaurant_owner_controller_1.getRestaurantOwnerController);
exports.RestaurantOwnerRouter.get("/restaurant_owner/:id", restaurant_owner_controller_1.getRestaurantOwnerByIdController);
exports.RestaurantOwnerRouter.post("/restaurant_owner", restaurant_owner_controller_1.createRestaurantOwnerController);
exports.RestaurantOwnerRouter.put("/restaurant_owner/:id", restaurant_owner_controller_1.updateRestaurantOwnerController);
exports.RestaurantOwnerRouter.delete("/restaurant_owner/:id", restaurant_owner_controller_1.deleteRestaurantOwnerController);
