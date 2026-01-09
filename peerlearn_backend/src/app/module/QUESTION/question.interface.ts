export type Upload_File_Type = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}

export type AI_Question_Type = {
    question: string;
    options: [string, string, string, string];
    answer: string;
};