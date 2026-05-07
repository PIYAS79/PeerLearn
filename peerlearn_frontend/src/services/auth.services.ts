import { authKey } from "@/constants/auth.key";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";


export const storeUserInfo = ({ access_token }: { access_token: string }) => {
    return setToLocalStorage(authKey, access_token);
}

export const get_User_Info = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData = decodedToken(authToken);
        return decodedData;
    }
}

export const is_Log_in = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return !!authToken;
    }
}

export const removeUserInfo = () => {
    return removeFromLocalStorage(authKey);
    
}

export const getNewAccessToken = async () => {
    return await axiosInstance({
        url: 'http://localhost:5000/api/v1/auth/refresh-token',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};