

export type Create_Request_Type = {
    req_maker_id: string,
    target_user_id: string,
    title: string,
    message: string,
    is_urgent?: boolean
}

export type Update_Request_Type = {
    title?: string,
    message?: string,
    is_urgent?: boolean
}