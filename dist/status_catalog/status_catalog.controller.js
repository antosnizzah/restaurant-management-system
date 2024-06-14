"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogController = exports.updateStatusCatalogController = exports.createStatusCatalogController = exports.getStatusCatalogByIdController = exports.getStatusCatalogController = void 0;
const status_catalog_service_1 = require("./status_catalog.service");
// get all StatusCatalog 
const getStatusCatalogController = async (c) => {
    try {
        const StatusCatalog = await (0, status_catalog_service_1.getStatusCatalogService)();
        if (StatusCatalog == null || StatusCatalog.length == 0) {
            return c.text("No StatusCatalog  found", 404);
        }
        return c.json(StatusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStatusCatalogController = getStatusCatalogController;
// get StatusCatalog  by id
const getStatusCatalogByIdController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const StatusCatalog = await (0, status_catalog_service_1.getStatusCatalogByIdService)(id);
        if (StatusCatalog == null) {
            return c.text("StatusCatalog   not found", 404);
        }
        return c.json(StatusCatalog, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getStatusCatalogByIdController = getStatusCatalogByIdController;
// create StatusCatalog
const createStatusCatalogController = async (c) => {
    try {
        const StatusCatalog = await c.req.json();
        const newStatusCatalog = await (0, status_catalog_service_1.createStatusCatalogService)(StatusCatalog);
        if (!newStatusCatalog)
            return c.text("StatusCatalog not created", 400);
        return c.json({ message: newStatusCatalog }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createStatusCatalogController = createStatusCatalogController;
//  update StatusCatalog 
const updateStatusCatalogController = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid id", 400);
        const StatusCatalog = await c.req.json();
        // search for  StatusCatalog  by id
        const updatedStatusCatalog = await (0, status_catalog_service_1.getStatusCatalogByIdService)(id);
        if (!updatedStatusCatalog === undefined)
            return c.text("order  not found", 404);
        // get data to StatusCatalog 
        const res = await (0, status_catalog_service_1.updateStatusCatalogService)(id, StatusCatalog);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateStatusCatalogController = updateStatusCatalogController;
// delete  StatusCatalog
const deleteStatusCatalogController = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid id", 400);
    try {
        // search for  by id
        const StatusCatalog = await (0, status_catalog_service_1.getStatusCatalogByIdService)(id);
        if (!StatusCatalog)
            return c.text("StatusCatalog not found", 404);
        // delete StatusCatalog 
        const res = await (0, status_catalog_service_1.deleteStatusCatalogService)(id);
        return c.json({ message: res }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteStatusCatalogController = deleteStatusCatalogController;
