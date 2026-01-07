import type { Update_Academic_Info_Type } from "./academic.interface";
import { prisma } from "../../lib/prisma";
import Final_App_Error from "../../errors/Final_App_Error";
import httpStatus from "http-status-codes";


const update_acedimic_info = async (data: Update_Academic_Info_Type, person_id: string) => {
    const person_data = await prisma.person.findUnique({
        where: { id: person_id }
    })
    if (!person_data) {
        throw new Final_App_Error(httpStatus.NOT_FOUND, 'Person not found');
    }
    const academic_info = await prisma.academic_Info.findUnique({
        where: {
            person_id: person_id
        }
    })
    if (!academic_info) {
        // if academic info not found, then create
        await prisma.academic_Info.create({
            data: {
                student_id: data.student_id,
                university: data.university,
                department: data.department,
                level: data.level,
                term: data.term,
                person_id: data.person_id
            }
        })
        return await prisma.person.findUnique({
            where: {
                id: person_data.id
            },
            include: {
                academicInfo: true
            }
        })
    }
    // else update academic info
    await prisma.academic_Info.update({
        where: {
            person_id: person_id
        },
        data: {
            student_id: data.student_id,
            university: data.university,
            department: data.department,
            level: data.level,
            term: data.term
        }
    })
    return await prisma.person.findUnique({
        where: {
            id: person_data.id
        },
        include: {
            academicInfo: true
        }
    })
}


export const Academic_Services = {
    update_acedimic_info
}