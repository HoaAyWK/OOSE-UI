import axios from "axios";
import api from './api';

const API_URL='https://locahost:7022/api/v1/Users/';

const getLoggedInUser = () => {
    return api.get('Users/GetLoggedInUserInfo');
};

const getUser = (id) => {
    return axios.get(API_URL + 'GetUser?id' + id);
};

const updateAvatar = (userId, filePath) => {
    return api.put('Users/UpdateAvatar', {
        userId,
        filePath
    });
};

const updateBackground = (userId, filePath) => {
    return api.put('Users/UpdateBackground', {
        userId,
        filePath
    });
};

const updateInfo = (userId, firstName, lastName, phone, address, country) => {
    return api.put('Users/UpdateUserInfo?id=' + userId , {
        firstName,
        lastName,
        phone,
        address,
        country
    });
};

const UserService = {
    getLoggedInUser,
    getUser,
    updateAvatar,
    updateBackground,
    updateInfo,
};

export default UserService;