import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Expertise_Services } from "./expertise.services";



const create_expertise = Async_Catch(async (req: Request, res: Response) => {
    const result = await Expertise_Services.create_expertise(req.body);
    res.status(200).json({
        status: 'success',
        message: 'Expertise created successfully',
        data: result,
    });
})

const get_all_expertise_of_person = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Expertise_Services.get_all_expertise_of_person(id as string);
    res.status(200).json({
        status: 'success',
        message: 'Get All Expertises successfully',
        data: result
    });
})

const update_expertise = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Expertise_Services.update_expertise(id as string, req.body);
    res.status(200).json({
        status: 'success',
        message: 'Expertise updated successfully',
        data: result
    });
})


const delete_expertise = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Expertise_Services.delete_expertise(id as string);
    res.status(200).json({
        status: 'success',
        message: 'Expertise deleted successfully',
        data: result
    });
})



export const Expertise_Controllers = {
    create_expertise,
    get_all_expertise_of_person,
    update_expertise,
    delete_expertise
}