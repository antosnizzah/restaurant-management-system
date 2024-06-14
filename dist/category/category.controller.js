"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryController = exports.updateCategoryController = exports.createCategoryController = exports.getCategoryByIdController = exports.getCategoryController = void 0;
const category_service_1 = require("./category.service");
// get all category
const getCategoryController = async (c) => {
    try {
        const category = await (0, category_service_1.getCategoryService)();
        if (category == null || category.length == 0) {
            return c.text("No category found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCategoryController = getCategoryController;
// get category by id
const getCategoryByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const category = await (0, category_service_1.getCategoryByIdService)(id);
        if (category == null) {
            return c.text("category not found", 404);
        }
        return c.json(category, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCategoryByIdController = getCategoryByIdController;
// create category
const createCategoryController = async (c) => {
    try {
        const category = await c.req.json();
        const newcategory = await (0, category_service_1.createCategoryService)(category);
        if (!newcategory)
            return c.text("category not created", 400);
        return c.json({ message: newcategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCategoryController = createCategoryController;
//  update category
const updateCategoryController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const category = await c.req.json();
        // search for category by id
        const updatedAddress = await (0, category_service_1.getCategoryByIdService)(id);
        if (!updatedAddress === undefined)
            return c.text("category not found", 404);
        // get data to update
        const res = await (0, category_service_1.updateCategoryService)(id, category);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCategoryController = updateCategoryController;
// delete category
const deleteCategoryController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for category by id
        const category = await (0, category_service_1.getCategoryByIdService)(id);
        if (!category)
            return c.text("Address not found", 404);
        // delete category
        const res = await (0, category_service_1.deleteCategoryService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCategoryController = deleteCategoryController;
