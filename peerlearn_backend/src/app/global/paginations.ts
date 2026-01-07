export type Pagination_Options_Type = {
    page ? : number,
    limit ? : number,
    sortBy ? : string,
    sortOrder ? : string
}
type Options_Return_Type = {
    page : number,
    limit : number,
    skip : number,
    sortBy : string,
    sortOrder : string
}

const calculate_pagination = (options : Pagination_Options_Type):Options_Return_Type=>{
    const page:number = Number(options.page) || 1;
    const limit:number = Number(options.limit) || 10;
    const skip:number = (Number(page)-1) * limit;
    const sortBy:string =  options.sortBy || 'createdAt';
    const sortOrder:string = options.sortOrder || 'desc'; 

    return {page,limit,skip,sortBy,sortOrder}
}


export default calculate_pagination;