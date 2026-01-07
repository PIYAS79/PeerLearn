import type { Request, Response } from "express";
import Async_Catch from "../../utils/try.code";
import { Person_Services } from "./person.services";
import pick from "../../global/pick";
import httpStatus from "http-status-codes";


const person_queryable_fields = [
    'email',
    'bkash',
    'search',
    'first_name',
    'last_name',
    // 'gender',
    'is_active'

]


const update_person = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Person_Services.update_person(id as string, req.body);
    res.status(200).json({
        status: 'success',
        message: 'Person updated successfully',
        data: result,
    });
})

const get_all_person = Async_Catch(async (req: Request, res: Response) => {
    const filters = pick(req.query, person_queryable_fields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await Person_Services.get_all_person(filters, options);
    res.status(httpStatus.OK).json({
        success: true,
        message: 'Persons retrieval successfully',
        meta: result.meta,
        data: result.data,
    })
});

const get_person_by_id = Async_Catch(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Person_Services.get_person_by_id(id as string);
    res.status(200).json({
        status: 'success',
        message: 'Get Single Person successfully',
        data: result,
    });
})


export const Person_Controller = {
    update_person,
    get_all_person,
    get_person_by_id
}