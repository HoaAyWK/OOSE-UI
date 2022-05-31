import axios from "axios";
import api from './api';

const API_URL='https://open-request-api.herokuapp.com/api/v1/Users/';

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

const getAllUser = () => {
    return api.get(API_URL + 'GetAll');
}

const deleteUser = async (id) => {
    return api.delete('/Users/DeleteUser?id=' + id);
}

const UserService = {
    getLoggedInUser,
    getUser,
    updateAvatar,
    updateBackground,
    updateInfo,
    getAllUser,
};

export default UserService;