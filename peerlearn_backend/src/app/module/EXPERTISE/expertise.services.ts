import type { Create_Expertise_Type, Update_Expertise_Type } from "./expertise.interface";
import { prisma } from '../../lib/prisma'
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from "http-status-codes";


const create_expertise = async (data: Create_Expertise_Type) => {
    const person = await prisma.person.findUnique({
        where: {
            id: data.person_id
        }
    })
    if (!person) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Person not found');
    }
    const result = await prisma.expertise.create({
        data
    })
    return result;
}

const get_all_expertise_of_person = async (person_id: string) => {
    const person = await prisma.person.findUnique({
        where: {
            id: person_id
        }
    })
    if (!person) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Person not found');
    }
    const result = await prisma.expertise.findMany({
        where: {
            person_id
        }
    })
    return {
        meta: {
            total: result.length
        },
        data: result
    }
};

const update_expertise = async (expertise_id: string, data: Update_Expertise_Type) => {
    const result = await prisma.expertise.update({
        where: { id: expertise_id },
        data
    })
    return result;
};

const delete_expertise = async (expertise_id: string) => {
    const result = await prisma.expertise.delete({
        where: {
            id: expertise_id
        }
    })
    return result;
};


export const Expertise_Services = {
    create_expertise,
    get_all_expertise_of_person,
    update_expertise,
    delete_expertise
}