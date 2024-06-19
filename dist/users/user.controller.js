"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetUserComments = exports.deleteUsersController = exports.updateUsersController = exports.createUsersController = exports.getUsersByIdController = exports.getUsersController = void 0;
const user_service_1 = require("./user.service");
// get all Users
const getUsersController = async (c) => {
    try {
        const limit = parseInt(c.req.query("limit") || "5");
        if (isNaN(limit) || limit <= 0) {
            return c.text("Invalid limit", 400);
        }
        const Users = await (0, user_service_1.getUsersService)(limit);
        if (Users == null || Users.length == 0) {
            return c.text("No Users found", 404);
        }
        return c.json(Users, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUsersController = getUsersController;
// get Users  by id
const getUsersByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const Users = await (0, user_service_1.getUsersByIdService)(id);
        if (Users == null) {
            return c.text("User  not found", 404);
        }
        return c.json(Users, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getUsersByIdController = getUsersByIdController;
// create  Users
const createUsersController = async (c) => {
    try {
        const Users = await c.req.json();
        const newUsers = await (0, user_service_1.createUsersService)(Users);
        if (!newUsers)
            return c.text("User not created", 400);
        return c.json({ message: newUsers }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createUsersController = createUsersController;
//  update Users 
const updateUsersController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const Users = await c.req.json();
        // search for  Users  by id
        const updatedUsers = await (0, user_service_1.getUsersByIdService)(id);
        // if (!updatedUsers=== undefined) return c.text("User  not found", 404);
        // get data to Users
        const res = await (0, user_service_1.updateUsersService)(id, Users);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateUsersController = updateUsersController;
// delete  Users
const deleteUsersController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for Users by id
        const Users = await (0, user_service_1.getUsersByIdService)(id);
        // if (!Users) return c.text("Users not found", 404);
        // delete order 
        const res = await (0, user_service_1.deleteUsersService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteUsersController = deleteUsersController;
const handleGetUserComments = async (c) => {
    try {
        const userId = parseInt(c.req.param('userId'));
        const comments = await (0, user_service_1.getUserComments)(userId);
        return c.json(comments, 200);
    }
    catch (error) {
    }
};
exports.handleGetUserComments = handleGetUserComments;
