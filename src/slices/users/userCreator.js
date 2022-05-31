import  UserService  from '../../services/user.service';
import { SET_USER, DELETE_USER, IS_ERROR, IS_LOADING } from "./userAction"

const isError = (value) => {
    return {
        type: IS_ERROR,
        payload: value,
    }
}

const isLoading = (value) => {
    return {
        type: IS_LOADING,
        payload: value,
    }
}

const deleteUser = (payload) => {
    return {
        type: DELETE_USER,
        payload
    }
}

const startDeleteUser = (payload) => {
    return async (dispatch) => {
       try {
           await UserService.deleteUser(payload);
           dispatch(deleteUser(payload));
       } catch (error) {
           dispatch(isError(true));
           throw new Error(error.response.data.error);
       }
    }
}

const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

const startSetAllUser = () => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const res = await UserService.getAllUser();
            if (res.data.content) {
                dispatch(isLoading(false));
                dispatch(setUser(res.data.content));
            }
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response);
        }
    }
}

export { deleteUser, setUser, startSetAllUser, startDeleteUser}