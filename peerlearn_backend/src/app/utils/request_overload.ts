import Final_App_Error from "../errors/Final_App_Error";
import { prisma } from "../lib/prisma";
import httpStatus from 'http-status-codes'

export const Reqeustf_Overload = async (
    req_maker_id: string,
    target_user_id: string
): Promise<{ success: boolean; time: number }> => {
    try {
        const lastRequest = await prisma.request.findFirst({
            where: {
                req_maker_id,
                target_user_id,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        if (!lastRequest) {
            return {
                success: false,
                time: 0,
            };
        }

        const now = new Date();
        const lastCreatedAt = lastRequest.created_at;

        const diffInMinutes =
            (now.getTime() - lastCreatedAt.getTime()) / (1000 * 60);

        if (diffInMinutes < 20) {
            return {
                success: true,
                time: Math.ceil(20 - diffInMinutes),
            };
        }

        return {
            success: false,
            time: 0,
        };
    } catch (err) {
        console.error(err);
        throw new Final_App_Error(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Request overload check failed"
        );
    }
};



