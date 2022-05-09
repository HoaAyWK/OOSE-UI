import axios from 'axios';

import api from './api';
import tokenService from './token.service';

const customerRegister = async (email, password, firstName, lastName, phone, dateOfBirth, address, country) => {
    return api
        .post('Accounts/CustomerRegister', {
            email,
            password,
            firstName,
            lastName,
            phone,
            dateOfBirth,
            address,
            country
        })
        .then((response) => {
            if (response.data.success) {
                tokenService.setUser(response.data);
            }
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.log(error.error);
        });
};

const freelancerRegister = async (email, password, firstName, lastName, phone, dateOfBirth, address, country) => {
    console.log(typeof(dateOfBirth));
    console.log(email, password, firstName, lastName, phone, dateOfBirth, address, country);
    return api
        .post('Accounts/FreelancerRegister', {
            email,
            password,
            firstName,
            lastName,
            phone,
            dateOfBirth,
            address,
            country
        })
        .then((response) => {
            if (response.data.success) {
                tokenService.setUser(response.data);
            }
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

const signIn = async (email, password) => {
    return api
        .post('Accounts/Login', {
            email,
            password
        })
        .then((response) => {
            if (response.data.success) {
                tokenService.setUser(response.data);
            }
            return response.data;
        });
};

const signOut = () => {
    tokenService.removeUser();
};

const AuthService = {
    customerRegister,
    freelancerRegister,
    signIn,
    signOut
};

export default AuthService;