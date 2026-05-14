

export enum Person_Role_Type {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
}


export type Create_Person_Type = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    role: Person_Role_Type
}

export type Update_Person_Type = {
    first_name?: string,
    last_name?: string,
    photo_url?: string,
    bkash?: string
}

export type Person_Query_Type = {
    email ?: string | undefined,
    bkash ?:string | undefined,
    search ?: string | undefined,
    first_name?:string | undefined,
    last_name?:string | undefined,
    department?:string |undefined,
    university?:string | undefined,
    term?:string | undefined,
    level?:string | undefined,
    student_id?:string | undefined,
}
