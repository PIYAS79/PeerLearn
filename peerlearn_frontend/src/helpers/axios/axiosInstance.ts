import { authKey } from '@/constants/auth.key';
import setAccessToken from '@/services/actions/set_Access_Token';
import { getNewAccessToken } from '@/services/auth.services';
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
    function (response) {
        return response;
    },

    async function (error) {
        const config = error.config;

        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true;

            const response = await getNewAccessToken();

            const access_token = response?.data?.access_token;

            config.headers['Authorization'] = access_token;

            setToLocalStorage(authKey, access_token);

            setAccessToken(access_token);

            return instance(config);
        }

        return Promise.reject(error);
    }
);

export { instance };