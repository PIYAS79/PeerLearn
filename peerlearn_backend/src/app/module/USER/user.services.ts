import { User_Role, User_Status } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt';
import config from "../../../config";
import { Person_Role_Type, type Create_Person_Type } from "../PERSON/person.interface";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from 'http-status-codes'
import type { JwtPayload } from "jsonwebtoken";


const create_person = async (data: Create_Person_Type) => {
    const hashed_password = await bcrypt.hash(data.password, Number(config.hash_pass_salt_rounds as unknown as number));
    const result = await prisma.$transaction(async (tc) => {
        const new_user = await tc.user.create({
            data: {
                email: data.email,
                password: hashed_password,
                status: User_Status.ACTIVE,
                role: data.role || Person_Role_Type.STUDENT
            }
        });
        const new_person = await tc.person.create({
            data: {
                email: new_user.email,
                first_name: data.first_name,
                last_name: data.last_name
            }
        })
        return new_person;
    })
    return result;
}

const create_admin = async (data: Create_Person_Type) => {
    const hashed_password = await bcrypt.hash(data.password, Number(config.hash_pass_salt_rounds as unknown as number));
    const result = await prisma.$transaction(async (tc) => {
        const new_user = await tc.user.create({
            data: {
                email: data.email,
                password: hashed_password,
                status: User_Status.ACTIVE,
                role: User_Role.ADMIN
            }
        });
        const new_person = await tc.person.create({
            data: {
                email: new_user.email,
                first_name: data.first_name,
                last_name: data.last_name,
            }
        })
        return new_person;
    })
    return result;
}

const delete_person_and_user = async (user_id: string, user: JwtPayload) => {
    const user_data = await prisma.user.findUnique({
        where: { id: user_id }
    })
    if (!user_data) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'User not found');
    }
    const isAdmin =
        user.role === User_Role.ADMIN ||
        user.role === User_Role.SUPERADMIN;

    const isSelf = user.email === user_data.email; 

    if (!isAdmin && !isSelf) {
        throw new Final_App_Error(
            httpStatus.FORBIDDEN,
            'You are not allowed to delete this user'
        );
    }
    const result = await prisma.$transaction(async (tc) => {
        const person = await tc.person.delete({
            where: { email: user_data.email }
        })
        await tc.user.delete({
            where: { id: user_id }
        })
        return person;
    })
    return result;
}




export const User_Services = {
    create_person,
    create_admin,
    delete_person_and_user
}