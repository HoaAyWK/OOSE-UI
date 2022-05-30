import { IS_LOADING, IS_ERROR, ADD_POST, UPDATE_POST, DELETE_POST, GET_ALL_POST } from './postAction';
import PostService from '../../services/post.service';

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

const addPost = (payload) => {
    return {
        type: ADD_POST,
        payload,
    }
}

const startAddPost = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const {  title,
                description,
                downloadURL,
                price,
                duration,
                category } = payload;
            const res = await PostService.createPost(title, description, downloadURL, price, duration, category);
            if (res.data) {
                dispatch(isLoading(false));
                dispatch(addPost(res.data));
            }
        }
        catch (error) {
            dispatch(isError(true));
            throw new Error(error.response);
        }
    }
}

const startGetPostByCustomer = () => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const res = await PostService.getCustomerLoggedInPosts();
            if (res.data.isSuccess) {
                dispatch(isLoading(false));
                dispatch(getAllPost(res.data.content));
            }
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response)
        }
    }
}

const updatePost = (payload) => {
    return {
        type: UPDATE_POST,
        payload,
    }
}

const startUpdatePost = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            await PostService.updatePost(...payload);
            dispatch(isLoading(false));
            dispatch(updatePost(payload));
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response.data.error);
        }
    }
}

const deletePost = (payload) => {
    return {
        type: DELETE_POST,
        payload,
    }
}

const startDeletePost = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            await PostService.deletePost(payload);
            dispatch(isLoading(false));
            dispatch(deletePost(payload));
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response.data.error);
        }
    }
}

const getAllPost = (payload) => {
    return {
        type: GET_ALL_POST,
        payload,
    }
}

const startGetAllPost = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true));
            const res = await PostService.getActivePosts();
            if (res.data) {
                dispatch(isLoading(false));
                dispatch(getAllPost(res.data.content));
            }
        } catch (error) {
            dispatch(isError(true));
            throw new Error(error.response.data.error);
        }
    }
}

export {
    addPost,
    updatePost,
    deletePost,
    getAllPost,
    startAddPost,
    startDeletePost,
    startGetAllPost,
    startUpdatePost,
    startGetPostByCustomer,
}