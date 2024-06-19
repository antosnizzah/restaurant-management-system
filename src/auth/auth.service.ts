import { AuthorizeUsersTable,TIAuthorizeUsers,TSAuthorizeUsers } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";



// create a authorization service

export const createAuthorizeUsersService = async (user: TIAuthorizeUsers): Promise<string | null> => {
    await db.insert(AuthorizeUsersTable).values(user)
    return "user created successfully";
}



// create a login service
export const userLoginService = async (user: TSAuthorizeUsers) => {
    const { username, password } = user;
    return await db.query.AuthorizeUsersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        },
        where: sql`${AuthorizeUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    contact_phone: true,
                    email: true,
                    id: true
                }
            }
        }
    });
};
