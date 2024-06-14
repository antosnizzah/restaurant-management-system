"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeUsersRelations = exports.restaurantRelations = exports.restaurantOwnerRelations = exports.cityRelations = exports.commentRelations = exports.addressRelations = exports.menuItemRelations = exports.orderMenuItemRelations = exports.orderStatusRelations = exports.orderRelations = exports.driverRelations = exports.RestaurantTable = exports.RestaurantOwnerTable = exports.StateTable = exports.CityTable = exports.CommentTable = exports.AddressTable = exports.CategoryTable = exports.MenuItemTable = exports.OrderMenuItemTable = exports.StatusCatalogTable = exports.OrderStatusTable = exports.OrdersTable = exports.DriverTable = exports.AuthorizeUsersTable = exports.roleEnum = exports.UsersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Define Users table
exports.UsersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey().unique(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone").notNull(),
    phone_verified: (0, pg_core_1.boolean)("phone_verified").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull(),
    email_verified: (0, pg_core_1.boolean)("email_verified").notNull(),
    confirmation_code: (0, pg_core_1.varchar)("confirmation_code"),
    password: (0, pg_core_1.varchar)("password").notNull(),
    // created_at: timestamp("created_at").notNull().defaultNow(),
    // updated_at: timestamp("updated_at").notNull(),
});
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin", "Driver", "super admin", "RestaurantOwner"]);
exports.AuthorizeUsersTable = (0, pg_core_1.pgTable)("authorizeusers", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
    password: (0, pg_core_1.varchar)("password").notNull(),
    username: (0, pg_core_1.varchar)("username").notNull(),
    role: (0, exports.roleEnum)("role").default("user")
});
// Define Driver table
exports.DriverTable = (0, pg_core_1.pgTable)("driver", {
    id: (0, pg_core_1.serial)("id").primaryKey().unique(),
    car_make: (0, pg_core_1.varchar)("car_make").notNull(),
    car_model: (0, pg_core_1.varchar)("car_model").notNull(),
    car_year: (0, pg_core_1.integer)("car_year").notNull(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)("online").notNull(),
    delivering: (0, pg_core_1.boolean)("delivering").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// Define Orders table
exports.OrdersTable = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey().unique(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.RestaurantTable.id, { onDelete: "cascade" }),
    estimated_delivery_time: (0, pg_core_1.time)("estimated_delivery_time").notNull(),
    actual_delivery_time: (0, pg_core_1.time)("actual_delivery_time"),
    delivery_address_id: (0, pg_core_1.integer)("delivery_address_id").notNull().references(() => exports.AddressTable.id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
    driver_id: (0, pg_core_1.integer)("driver_id").notNull().references(() => exports.DriverTable.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.decimal)("price").notNull(),
    discount: (0, pg_core_1.decimal)("discount").notNull(),
    final_price: (0, pg_core_1.decimal)("final_price").notNull(),
    comment: (0, pg_core_1.varchar)("comment"),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// Define OrderStatus table
exports.OrderStatusTable = (0, pg_core_1.pgTable)("order_status", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.OrdersTable.id, { onDelete: "cascade" }),
    status_catalog_id: (0, pg_core_1.integer)("status_catalog_id").notNull().references(() => exports.StatusCatalogTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
});
// Define StatusCatalog table
exports.StatusCatalogTable = (0, pg_core_1.pgTable)("status_catalog", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
});
// Define OrderMenuItem table
exports.OrderMenuItemTable = (0, pg_core_1.pgTable)("order_menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.OrdersTable.id, { onDelete: "cascade" }),
    menu_item_id: (0, pg_core_1.integer)("menu_item_id").notNull().references(() => exports.MenuItemTable.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    item_price: (0, pg_core_1.decimal)("item_price").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    comment: (0, pg_core_1.varchar)("comment"),
});
// Define MenuItem table
exports.MenuItemTable = (0, pg_core_1.pgTable)("menu_item", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.RestaurantTable.id),
    category_id: (0, pg_core_1.integer)("category_id").notNull().references(() => exports.CategoryTable.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.varchar)("description").notNull(),
    ingredients: (0, pg_core_1.varchar)("ingredients").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    active: (0, pg_core_1.boolean)("active").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// Define Category table
exports.CategoryTable = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
});
// Define Address table
exports.AddressTable = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    street_address_1: (0, pg_core_1.varchar)("street_address_1").notNull(),
    street_address_2: (0, pg_core_1.varchar)("street_address_2"),
    zip_code: (0, pg_core_1.varchar)("zip_code").notNull(),
    delivery_instructions: (0, pg_core_1.varchar)("delivery_instructions"),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
    city_id: (0, pg_core_1.integer)("city_id").notNull().references(() => exports.CityTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// Define Comment table
exports.CommentTable = (0, pg_core_1.pgTable)("comment", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").notNull().references(() => exports.OrdersTable.id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
    comment: (0, pg_core_1.varchar)("comment").notNull(),
    comment_text: (0, pg_core_1.varchar)("comment_text").notNull(),
    is_praise: (0, pg_core_1.boolean)("is_praise").notNull(),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// Define City table
exports.CityTable = (0, pg_core_1.pgTable)("city", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    state_id: (0, pg_core_1.integer)("state_id").notNull().references(() => exports.StateTable.id, { onDelete: "cascade" }),
});
// Define State table
exports.StateTable = (0, pg_core_1.pgTable)("state", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
});
// Define RestaurantOwner table
exports.RestaurantOwnerTable = (0, pg_core_1.pgTable)("restaurant_owner", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").notNull().references(() => exports.RestaurantTable.id, { onDelete: "cascade" }),
    owner_id: (0, pg_core_1.integer)("owner_id").notNull().references(() => exports.UsersTable.id, { onDelete: "cascade" }),
});
// Define Restaurant table
exports.RestaurantTable = (0, pg_core_1.pgTable)("restaurant", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    street_address: (0, pg_core_1.varchar)("street_address").notNull(),
    zip_code: (0, pg_core_1.varchar)("zip_code").notNull(),
    city_id: (0, pg_core_1.integer)("city_id").notNull().references(() => exports.CityTable.id, { onDelete: "cascade" }),
    // created_at: timestamp("created_at").notNull(),
    // updated_at: timestamp("updated_at").notNull(),
});
// RELATIONSHIPS FROM THE ABOVE TABLES
exports.driverRelations = (0, drizzle_orm_1.relations)(exports.DriverTable, ({ one, many }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.DriverTable.user_id],
        references: [exports.UsersTable.id],
    }),
    orders: many(exports.OrdersTable),
}));
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.OrdersTable, ({ one, many }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.OrdersTable.user_id],
        references: [exports.UsersTable.id],
    }),
    driver: one(exports.DriverTable, {
        fields: [exports.OrdersTable.driver_id],
        references: [exports.DriverTable.id],
    }),
    address: one(exports.AddressTable, {
        fields: [exports.OrdersTable.delivery_address_id],
        references: [exports.AddressTable.id],
    }),
    restaurant: one(exports.RestaurantTable, {
        fields: [exports.OrdersTable.restaurant_id],
        references: [exports.RestaurantTable.id],
    }),
    orderStatus: many(exports.OrderStatusTable),
    orderMenuItems: many(exports.OrderMenuItemTable),
}));
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.OrderStatusTable, ({ one }) => ({
    order: one(exports.OrdersTable, {
        fields: [exports.OrderStatusTable.order_id],
        references: [exports.OrdersTable.id],
    }),
    statusCatalog: one(exports.StatusCatalogTable, {
        fields: [exports.OrderStatusTable.status_catalog_id],
        references: [exports.StatusCatalogTable.id],
    }),
}));
exports.orderMenuItemRelations = (0, drizzle_orm_1.relations)(exports.OrderMenuItemTable, ({ one }) => ({
    order: one(exports.OrdersTable, {
        fields: [exports.OrderMenuItemTable.order_id],
        references: [exports.OrdersTable.id],
    }),
    menuItem: one(exports.MenuItemTable, {
        fields: [exports.OrderMenuItemTable.menu_item_id],
        references: [exports.MenuItemTable.id],
    }),
}));
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.MenuItemTable, ({ one, many }) => ({
    restaurant: one(exports.RestaurantTable, {
        fields: [exports.MenuItemTable.restaurant_id],
        references: [exports.RestaurantTable.id],
    }),
    category: one(exports.CategoryTable, {
        fields: [exports.MenuItemTable.category_id],
        references: [exports.CategoryTable.id],
    }),
    orderMenuItems: many(exports.OrderMenuItemTable),
}));
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.AddressTable, ({ one, many }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.AddressTable.user_id],
        references: [exports.UsersTable.id],
    }),
    city: one(exports.CityTable, {
        fields: [exports.AddressTable.city_id],
        references: [exports.CityTable.id],
    }),
    orders: many(exports.OrdersTable),
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.CommentTable, ({ one }) => ({
    order: one(exports.OrdersTable, {
        fields: [exports.CommentTable.order_id],
        references: [exports.OrdersTable.id],
    }),
    user: one(exports.UsersTable, {
        fields: [exports.CommentTable.user_id],
        references: [exports.UsersTable.id],
    }),
}));
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.CityTable, ({ one, many }) => ({
    state: one(exports.StateTable, {
        fields: [exports.CityTable.state_id],
        references: [exports.StateTable.id],
    }),
    addresses: many(exports.AddressTable),
    restaurants: many(exports.RestaurantTable),
}));
exports.restaurantOwnerRelations = (0, drizzle_orm_1.relations)(exports.RestaurantOwnerTable, ({ one }) => ({
    restaurant: one(exports.RestaurantTable, {
        fields: [exports.RestaurantOwnerTable.restaurant_id],
        references: [exports.RestaurantTable.id],
    }),
    owner: one(exports.UsersTable, {
        fields: [exports.RestaurantOwnerTable.owner_id],
        references: [exports.UsersTable.id],
    }),
}));
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.RestaurantTable, ({ one, many }) => ({
    city: one(exports.CityTable, {
        fields: [exports.RestaurantTable.city_id],
        references: [exports.CityTable.id],
    }),
    orders: many(exports.OrdersTable),
    menuItems: many(exports.MenuItemTable),
    restaurantOwners: many(exports.RestaurantOwnerTable),
}));
exports.AuthorizeUsersRelations = (0, drizzle_orm_1.relations)(exports.AuthorizeUsersTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.AuthorizeUsersTable.user_id],
        references: [exports.UsersTable.id],
    }),
}));
