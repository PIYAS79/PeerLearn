import { authKey } from '@/constants/auth.key';
import setAccessToken from '@/services/actions/set_Access_Token';
import { getNewAccessToken } from '@/services/auth.services';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

const instance = axios.create({
    withCredentials: true
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const access_token = getFromLocalStorage(authKey);

        if (access_token) {
            config.headers.Authorization = access_token;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        const responseObject: ResponseSuccessType = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        // console.log(error);
        const config = error.config;
        // console.log(config);
        if (error?.response?.status === 500 && !config.sent) {
            config.sent = true;
            const response = await getNewAccessToken();
            const access_token = response?.data?.access_token;
            config.headers['Authorization'] = access_token;
            setToLocalStorage(authKey, access_token);
            setAccessToken(access_token);
            return instance(config);
        } else {
            const responseObject: IGenericErrorResponse = {
                statusCode: error?.response?.data?.statusCode || 500,
                message:
                    error?.response?.data?.message || 'Something went wrong!!!',
                errorMessages: error?.response?.data?.message,
            };
            // return Promise.reject(error);
            return responseObject;
        }
    }
);

export { instance };