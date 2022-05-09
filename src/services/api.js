import axios from 'axios';

import TokenService from "./token.service";

const instance = axios.create({
    baseURL: 'https://localhost:7022/api/v1/',
    headers: {
        'Content-type': 'application/json'
    },
});

instance.interceptors.request.use((config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use((res) => {
    return res;
},
async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== 'Accounts/Login' && error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const rs = await instance.post('Accounts/RefreshToken', {
                    token: TokenService.getLocalAccessToken(),
                    refreshToken: TokenService.getLocalRefreshToken(),
                });

                const { token, refreshToken } = rs.data;
                console.log(token, refreshToken);
                TokenService.updateLocalAccessToken(token);
                TokenService.updateRefreshToken(refreshToken);
                
                return instance(originalConfig);
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }
    return Promise.reject(error);
});

export default instance;