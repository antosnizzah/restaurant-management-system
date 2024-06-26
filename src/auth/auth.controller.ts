import "dotenv/config";
import { Context } from "hono";
import { createAuthorizeUsersService, userLoginService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { v4 as uuidv4 } from 'uuid';


import { sendRegistrationEmailTemplate } from "../mails/emailservices";

export const createAuthorizeUsersController = async (c: Context) => {
    try {
        const user = await c.req.json();
        console.log("Received user data:", user); // Log received user data

        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;

        // Generate a unique verification token
        const verificationToken = uuidv4();
        user.verificationToken = verificationToken;

        const createdUser = await createAuthorizeUsersService(user);
        console.log("Created user data:", createdUser); // Log created user data

        if (!createdUser) return c.text("User not created", 404);

        // Send welcome email with verification link
        const verificationUrl = `http://localhost:8000/auth/verify?token=${verificationToken}`;

        // Send registration email
        const emailResponse = await sendRegistrationEmailTemplate(user.email, 'registered with our service', user.username, verificationUrl);
        console.log("Email response:", emailResponse); // Log email response for debugging

        return c.json({ message: createdUser, emailResponse }, 201);
    } catch (err: any) {
        console.log("Error in createAuthorizeUsersController:", err); // Log any error
        return c.json({ error: err?.message }, 400);
    }
};

export const UserLoginController = async (c: Context) => {
    try {
        const user = await c.req.json();
        console.log('Received user:', user);

        const userExist: any = await userLoginService(user);
        console.log('User found:', userExist);

        if (userExist === null) {
            return c.json({ error: "User not found" }, 404);
        }

        const userMatch = await bcrypt.compare(user.password, userExist?.password as string);
        console.log('Password match:', userMatch);

        if (!userMatch) {
            return c.json({ error: "Password not match" }, 401);
        } else {
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
            const token = await sign(payload, secret);
            console.log('Generated token:', token);

            if (!token) {
                throw new Error('Token generation failed');
            }

            const user = userExist?.user;
            const role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200);
        }
    } catch (error: any) {
        console.error('Error:', error);
        return c.json({ error: error?.message }, 400);
    }
};
