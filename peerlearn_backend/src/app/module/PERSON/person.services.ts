import type { Prisma } from "@prisma/client";
import Final_App_Error from "../../errors/Final_App_Error";
import { prisma } from "../../lib/prisma"
import type { Person_Query_Type, Update_Person_Type } from "./person.interface";
import httpStatus from 'http-status-codes'
import type { Pagination_Options_Type } from "../../global/paginations";
import calculate_pagination from "../../global/paginations";
import type { equal } from "assert";



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
    console.log(params)
    const { page, limit, skip } = calculate_pagination(pagination);
 
    // Separate nested academicInfo fields from top-level fields
    const {
        search,
        department,
        university,
        term,
        student_id,
        level,
        ...top_level_filter_fields
    } = params;
 
    const and_conditions: Prisma.PersonWhereInput[] = [];
 
    // ── Search (top-level fields) ──────────────────────────────
    if (search) {
        and_conditions.push({
            OR: [
                { first_name: { contains: search, mode: "insensitive" } },
                { last_name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { bkash: { contains: search, mode: "insensitive" } },
            ],
        });
    }
 
    // ── Top-level exact filters (email, bkash, is_active, etc.) ─
    const top_level_keys = Object.keys(top_level_filter_fields);
    if (top_level_keys.length > 0) {
        and_conditions.push({
            AND: top_level_keys.map((field) => ({
                [field]: {
                    contains: (top_level_filter_fields as any)[field],
                    mode: "insensitive",
                },
            })),
        });
    }
 
    // ── Nested academicInfo filters ───────────────────────────
    const academic_filters: Record<string, any> = {};
    if (university) academic_filters.university = { contains: university, mode: "insensitive" };
    if (student_id) academic_filters.student_id = { contains: student_id, mode: "insensitive" };
    if (level)      academic_filters.level      = { equals:   level };   // enum — exact match
    if (term)      academic_filters.term      = { equals:   term };   // enum — exact match
    if (department) academic_filters.department = { equals:   department };   // enum — exact match
 
    if (Object.keys(academic_filters).length > 0) {
        and_conditions.push({
            academicInfo: {
                is: {
                AND: Object.entries(academic_filters).map(([key, value]) => ({
                    [key]: value,
                })),
            },
            },
        });
    }
 
    // ── Build final where clause ──────────────────────────────
    const where_conditions: Prisma.PersonWhereInput =
        and_conditions.length > 0 ? { AND: and_conditions } : {};
 
    // ── Count + Query ─────────────────────────────────────────
    const total = await prisma.person.count({ where: where_conditions });
 
    const res = await prisma.person.findMany({
        where: where_conditions,
        skip,
        take: limit,
        include: {
            academicInfo: {
                select: {
                    department: true,
                    university: true,
                    level: true,
                    term: true,
                    student_id: true,
                },
            },
            expertises: {
                select: {
                    topic: true,
                    level: true,
                },
            },
            as_target_user: {
                select: {
                    ai_rating: true,
                },
            },
            user:{
                select:{
                    id:true
                }
            }
        },
        orderBy:
            pagination.sortBy && pagination.sortOrder
                ? { [pagination.sortBy]: pagination.sortOrder }
                : { created_at: "desc" },
    });
 
    return {
        meta: { limit, page, total },
        data: res,
    };
};

const get_person_by_email = async (email: string) => {
    const person_data = await prisma.person.findUnique({
        where: { email },
        include: {
            academicInfo: true,
            expertises: true,
            as_req_maker: {
                include: {
                    target_user: {
                        select: {
                            first_name: true,
                            last_name: true,
                            photo_url: true,
                        }
                    }
                }
            },
            as_review_maker: true,
            as_review_target_user: true,
            as_target_user: {
                include: {
                    req_maker: {
                        select: {
                            first_name: true,
                            last_name: true,
                            photo_url: true,
                        }
                    }
                }
            }
        }
    })
    return person_data;
};

export const Person_Services = {
    update_person,
    get_all_person,
    get_person_by_email
}