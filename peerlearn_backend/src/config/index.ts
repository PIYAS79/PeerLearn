import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port_number: process.env.PORT,
    hash_pass_salt_rounds: process.env.HASH_PASS_SALT_ROUNDS,
    // environment:process.env.ENVIRONMENT,
    jwt: {
        access_token_secret: process.env.ACCESS_T_SECRET,
        access_token_exp: process.env.ACCESS_T_EXP,
        refresh_token_secret: process.env.REFRESH_T_SECRET,
        refresh_token_exp: process.env.REFRESH_T_EXP,
        forgot_token_secret: process.env.FORGOT_TOKEN_SECRET,
        forgot_token_exp: process.env.FORGOT_TOKEN_EXP,
    },
    nodemailer: {
        base_email: process.env.BASE_EMAIL,
        frontend_url: process.env.FRONT_END_URL,
        app_pass: process.env.APP_PASS
    }
}