"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = exports.createAuthorizeUsersController = void 0;
require("dotenv/config");
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const uuid_1 = require("uuid");
const emailservices_1 = require("../mails/emailservices");
const createAuthorizeUsersController = async (c) => {
    try {
        const user = await c.req.json();
        console.log("Received user data:", user); // Log received user data
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        // Generate a unique verification token
        const verificationToken = (0, uuid_1.v4)();
        user.verificationToken = verificationToken;
        const createdUser = await (0, auth_service_1.createAuthorizeUsersService)(user);
        console.log("Created user data:", createdUser); // Log created user data
        if (!createdUser)
            return c.text("User not created", 404);
        // Send welcome email with verification link
        const verificationUrl = `http://localhost:8000/auth/verify?token=${verificationToken}`;
        // Send registration email
        const emailResponse = await (0, emailservices_1.sendRegistrationEmailTemplate)(user.email, 'registered with our service', user.username, verificationUrl);
        console.log("Email response:", emailResponse); // Log email response for debugging
        return c.json({ message: createdUser, emailResponse }, 201);
    }
    catch (err) {
        console.log("Error in createAuthorizeUsersController:", err); // Log any error
        return c.json({ error: err?.message }, 400);
    }
};
exports.createAuthorizeUsersController = createAuthorizeUsersController;
const UserLoginController = async (c) => {
    try {
        const user = await c.req.json();
        console.log('Received user:', user);
        const userExist = await (0, auth_service_1.userLoginService)(user);
        console.log('User found:', userExist);
        if (userExist === null) {
            return c.json({ error: "User not found" }, 404);
        }
        const userMatch = await bcrypt_1.default.compare(user.password, userExist?.password);
        console.log('Password match:', userMatch);
        if (!userMatch) {
            return c.json({ error: "Password not match" }, 401);
        }
        else {
            const payload = {
                name: userExist.username,
                role: userExist?.role,
                expire: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
            };
            const secret = process.env.JWT_SECRET;
            console.log('JWT secret:', secret);
            if (!secret) {
                throw new Error('JWT_SECRET is not defined');
            }
            // Generate the token using @hono/jwt and await the promise
            const token = await (0, jwt_1.sign)(payload, secret);
            console.log('Generated token:', token);
            if (!token) {
                throw new Error('Token generation failed');
            }
            const user = userExist?.user;
            const role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);
        }
    }
    catch (error) {
        console.error('Error:', error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.UserLoginController = UserLoginController;
