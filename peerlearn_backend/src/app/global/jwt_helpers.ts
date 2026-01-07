import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";



type Payload_Type = {
    email: string,
    role: string,
}


const generate_token = (payload: Payload_Type, secret: Secret, expiresIn: string) => {
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    })
}

const verify_token = (token:string,secret:Secret) =>{
    return jwt.verify(token, secret) as JwtPayload;
}


export const JWT_Helper = {
    generate_token,
    verify_token
}