"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const user_router_1 = require("./users/user.router");
const state_router_1 = require("./state/state.router");
const address_router_1 = require("./address/address.router");
const category_router_1 = require("./category/category.router");
const city_router_1 = require("./city/city.router");
const comment_router_1 = require("./comment/comment.router");
const driver_router_1 = require("./driver/driver.router");
const menu_item_router_1 = require("./menu_item/menu_item.router");
const order_menu_router_1 = require("./order_menu/order_menu.router");
const orders_router_1 = require("./orders/orders.router");
const order_status_router_1 = require("./order_status/order_status.router");
const restaurant_router_1 = require("./restaurant/restaurant.router");
const restaurant_owner_router_1 = require("./restaurant_owner/restaurant_owner.router");
const status_catalog_router_1 = require("./status_catalog/status_catalog.router");
const auth_router_1 = require("./auth/auth.router");
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const emailservices_1 = require("./mails/emailservices");
const app = new hono_1.Hono();
app.get('/', async (c) => {
    try {
        let html = ((0, fs_1.readFileSync)('./index.html', 'utf-8'));
        return c.html(html);
    }
    catch (error) {
        return c.json({ error: error.message, status: 500 });
    }
});
app.notFound((c) => {
    return c.text('route not found ', 404);
});
app.route("/", user_router_1.userRouter);
app.route("/", address_router_1.AddressRouter);
app.route("/", category_router_1.CategoryRouter);
app.route("/", city_router_1.CityRouter);
app.route("/", comment_router_1.CommentRouter);
app.route("/", driver_router_1.DriverRouter);
app.route("/", menu_item_router_1.MenuItemRouter);
app.route("/", order_menu_router_1.OrderMenuItemRouter);
app.route("/", orders_router_1.OrdersRouter);
app.route("/", order_status_router_1.OrderStatusRouter);
app.route("/", restaurant_router_1.RestaurantRouter);
app.route("/", restaurant_owner_router_1.RestaurantOwnerRouter);
app.route("/", state_router_1.stateRouter);
app.route("/", status_catalog_router_1.StatusCatalogRouter);
app.route("auth/", auth_router_1.authRouter);
(0, assert_1.default)(process.env.PORT, "PORT is not set in the .env file");
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT} 📢`);
const arg1 = 'value1';
const arg2 = 'value2';
const arg3 = 'value3';
const arg4 = 'value4';
(0, emailservices_1.sendRegistrationEmailTemplate)(arg1, arg2, arg3, arg4);
