import type { Change_Password_Type, Login_Type } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt';
import { JWT_Helper } from "../../global/jwt_helpers";
import { User_Status } from "@prisma/client";
import config from "../../../config";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from "http-status-codes";
import Send_Email from "../../utils/nodemailer";
import type { JwtPayload } from "jsonwebtoken";


const user_login = async (data: Login_Type) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: data.email,
            status: User_Status.ACTIVE
        }
    })
    const is_pass_match = await bcrypt.compare(data.password, user_data.password);
    if (!is_pass_match) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Password not match !!")
    }
    const access_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.access_token_secret as string, config.jwt.access_token_exp as string)

    const refresh_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.refresh_token_secret as string, config.jwt.refresh_token_exp as string)

    return {
        access_token,
        refresh_token,
    }
}

const fetch_refresh_token = async (token: string) => {
    let decrypted_data;
    try {
        decrypted_data = JWT_Helper.verify_token(token, config.jwt.refresh_token_secret as string);
    } catch (err: any) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "you are not authorized !")
    }
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: decrypted_data?.email,
            status: User_Status.ACTIVE
        }
    })
    const access_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.access_token_secret as string, config.jwt.access_token_exp as string)

    return { access_token }
}

const change_password = async (user: any, data: Change_Password_Type) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: User_Status.ACTIVE
        }
    })
    const is_correct_pass: boolean = await bcrypt.compare(data.old_password, user_data.password);
    if (!is_correct_pass) {
        throw new Final_App_Error(httpStatus.UNAUTHORIZED, "Password not matched!")
    }
    const hashed_pass: string = await bcrypt.hash(data.new_password, Number(config.hash_pass_salt_rounds));
    await prisma.user.update({
        where: {
            email: user_data.email
        },
        data: {
            password: hashed_pass,
        }
    })
    return { message: "Successfully Password Change!" }

}

const forget_password = async (email: string) => {
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: email
        }
    })
    const forgot_token = JWT_Helper.generate_token({
        email: user_data.email,
        role: user_data.role
    }, config.jwt.forgot_token_secret as string, config.jwt.forgot_token_exp as string)

    const reset_pass_link = config.nodemailer.frontend_url + `?email=${user_data.email}&token=${forgot_token}`;
    await Send_Email(user_data.email, `
            <div>
                <p>Dear User,</p>
                <a href=${reset_pass_link}>
                    <button>
                        Reset Password
                    </button>
                </a>
                <p>${forgot_token}</p>
            </div>
        `)
}

const reset_password = async (token: string, data: { password: string }) => {
    if (!token) {
        throw new Final_App_Error(httpStatus.FORBIDDEN, "Token Not Found!")
    }
    const token_data: JwtPayload = JWT_Helper.verify_token(token, config.jwt.forgot_token_secret as string);
    const user_data = await prisma.user.findUniqueOrThrow({
        where: {
            email: token_data.email
        }
    })
    const hashed_pass = await bcrypt.hash(data.password, Number(config.hash_pass_salt_rounds));
    await prisma.user.update({
        where: {
            email: user_data.email
        },
        data: {
            password: hashed_pass
        }
    })
    return {}
}


export const Auth_Services = {
    user_login,
    fetch_refresh_token,
    change_password,
    forget_password,
    reset_password
}

