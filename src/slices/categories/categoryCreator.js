import {IS_LOADING, IS_ERROR, ADD_CATEGORY, GET_ALL_CATEGORY, UPDATE_CATEGORY} from './categoryAction';
import CategoryService from '../../services/category.service';

const isLoading = (payload) => {
    return {
        type: IS_LOADING,
        payload,
    }
}

const isError = (payload) => {
    return {
        type: IS_ERROR,
        payload,
    }
}

const addCategory = (payload) => {
    return {
        type: ADD_CATEGORY,
        payload,
    }
}

const startAddCategory = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const {  name,
                description,
                featuredImage,
                } = payload;
            const res = await CategoryService.createCategory(name, description, featuredImage);
            if (res.data) {
                dispatch(isLoading(false));
                dispatch(addCategory(res.data));
            }
        }
        catch (error) {
            dispatch(isError(true));
            throw new Error(error.response);
        }
    }
}

const getAllCategory = (payload) => {
    return {
        type: GET_ALL_CATEGORY,
        payload,
    }
}

const startGetAllCategory  = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            const res = await CategoryService.getCategories();

            if (res.data.content) {
                dispatch(isLoading(false));
                dispatch(getAllCategory(res.data.content));
            }

        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response)
        }
    }
}

const updateCategory = (payload) => {
    return {
        type: UPDATE_CATEGORY,
        payload,
    }
}

const startUpdateCategory = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const { id,
                    name,
                    description,
                    featuredImage 
                } = payload;
            await CategoryService.updateCategory(id, name, description, featuredImage)
            dispatch(isLoading(false));
            dispatch(updateCategory(payload));
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response);
        }
    }
}

export {startAddCategory, startGetAllCategory, startUpdateCategory, addCategory, updateCategory, getAllCategory}