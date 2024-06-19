"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentController = exports.updateCommentController = exports.createCommentController = exports.getCommentByIdController = exports.getCommentController = void 0;
const comment_service_1 = require("./comment.service");
// get all comment
const getCommentController = async (c) => {
    try {
        const comment = await (0, comment_service_1.getCommentService)();
        if (comment == null || comment.length == 0) {
            return c.text("No comment found", 404);
        }
        return c.json(comment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCommentController = getCommentController;
// get comment by id
const getCommentByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const comment = await (0, comment_service_1.getCommentByIdService)(id);
        if (comment == null) {
            return c.text("comment not found", 404);
        }
        return c.json(comment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getCommentByIdController = getCommentByIdController;
// create comment
const createCommentController = async (c) => {
    try {
        const comment = await c.req.json();
        const newComment = await (0, comment_service_1.createCommentService)(comment);
        if (!newComment)
            return c.text("comment not created", 400);
        return c.json({ message: newComment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createCommentController = createCommentController;
//  update comment
const updateCommentController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const comment = await c.req.json();
        // search for comment by id
        const updatedcomment = await (0, comment_service_1.getCommentByIdService)(id);
        if (!updatedcomment === undefined)
            return c.text("comment not found", 404);
        // get data to update
        const res = await (0, comment_service_1.updateCommentService)(id, comment);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateCommentController = updateCommentController;
// delete comment
const deleteCommentController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for comment by id
        const comment = await (0, comment_service_1.getCommentByIdService)(id);
        if (!comment)
            return c.text("comment not found", 404);
        // delete comment
        const res = await (0, comment_service_1.deleteCommentService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteCommentController = deleteCommentController;
