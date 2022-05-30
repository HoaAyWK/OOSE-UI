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
    return (dispatch) => {
        dispatch(isLoading(true));

        UserService.getAllUser()
        .then((response) => {
            if (response.status !== 200){
                throw Error(response.statusText);
            }

            dispatch(isLoading(false));
            return response.data.content;
        })
        .then((response) => {
            dispatch(setUser(response));
        })
        .catch(() => {
            dispatch(isError(true));
        })
    }
}

export { deleteUser, setUser, startSetAllUser, startDeleteUser}