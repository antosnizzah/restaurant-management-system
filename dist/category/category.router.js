"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const hono_1 = require("hono");
const category_controller_1 = require("./category.controller");
exports.CategoryRouter = new hono_1.Hono();
exports.CategoryRouter.get("/category/:id", category_controller_1.getCategoryByIdController);
exports.CategoryRouter.get("/category", category_controller_1.getCategoryController);
exports.CategoryRouter.delete("/category/:id", category_controller_1.deleteCategoryController);
exports.CategoryRouter.put("/category/:id", category_controller_1.updateCategoryController);
exports.CategoryRouter.post("/category", category_controller_1.createCategoryController);
