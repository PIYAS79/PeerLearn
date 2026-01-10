import type { Prisma } from "@prisma/client";
import Final_App_Error from "../../errors/Final_App_Error";
import { prisma } from "../../lib/prisma"
import type { Person_Query_Type, Update_Person_Type } from "./person.interface";
import httpStatus from 'http-status-codes'
import type { Pagination_Options_Type } from "../../global/paginations";
import calculate_pagination from "../../global/paginations";



const update_person = async (id: string, data: Update_Person_Type) => {
    const person = await prisma.person.findUnique({
        where: { id }
    })
    if (!person) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, "Person not found !");
    }
    const updated_data = await prisma.person.update({
        where: { id },
        data
    })
    return updated_data;
}

const get_all_person = async (params: Person_Query_Type, pagination: Pagination_Options_Type) => {
    const { page, limit, skip } = calculate_pagination(pagination);
    const { search, ...filter_field } = params;
    const search_conditions: Prisma.PersonWhereInput[] = [];
    const searchable_fields = ['first_name', 'last_name', 'email', 'bkash'];
    if (params.search) {
        search_conditions.push({
            OR: searchable_fields.map((field) => ({
                [field]: {
                    contains: params.search,
                    mode: "insensitive"
                }
            }))
        })
    }
    if (Object.keys(filter_field).length > 0) {
        search_conditions.push({
            AND: Object.keys(filter_field).map((field) => ({
                [field]: {
                    equals: (filter_field as any)[field]
                }
            }))
        })
    }



    const where_conditions: Prisma.PersonWhereInput = { AND: search_conditions }

    const total = await prisma.person.count({
        where: where_conditions
    })
    const res = await prisma.person.findMany({
        where: where_conditions,
        skip,
        take: limit,
        orderBy: pagination.sortBy && pagination.sortOrder ? {
            [pagination.sortBy]: pagination.sortOrder
        } : {
            created_at: 'desc'
        },
    });
    return {
        meta: {
            limit,
            page,
            total
        },
        data: res
    };
}

const get_person_by_id = async (id: string) => {
    const person_data = await prisma.person.findUnique({
        where: { id },
        include: {
            academicInfo: true,
            expertises: true,
            as_req_maker:true,
            as_review_maker:true,
            as_review_target_user:true,
            as_target_user:true
        }
    })
    return person_data;
};

export const Person_Services = {
    update_person,
    get_all_person,
    get_person_by_id
}