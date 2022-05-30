import api from './api';
import axios from 'axios';

const API_URL = 'https://open-request-api.herokuapp.com/api/v1/';

const getActivePosts = () => {
    return axios.get(API_URL + 'Posts/AllActivePosts');
};

const getHighestPosts = (number) => {
    return axios.get(API_URL + 'Posts/GetHighestPricePosts?number=' + number)
}

const getPostById = (id) => {
    return axios.get(API_URL + 'Posts/GetPost?id=' + id);
};

const getPostsByCategory = (category) => {
    return axios.get(API_URL + 'Posts/GetPostsByCategory?id=' + category);
};

const getPostRequestsByPostId = (postId) => {
    return api.get('/Posts/GetPostRequestsByPostId?postId=' + postId);
}

const getCustomerLoggedInPosts = () => {
    return api.get('Posts/GetCustomerPosts');
};

const selectPost = (postId) => {
    return api.post('Posts/SelectPost?id=' + postId);
};

const unselectPost = (postId, freelancerId) => {
    return api.delete('Posts/UnSelectPost?postId=' + postId + '&freelancerId=' + freelancerId);
}

const createPost = (title, description, featuredImage, price, duration, categories) => {
    return api.post('Posts/CreatePost', {
        title,
        description,
        featuredImage,
        price,
        duration,
        categories
    });
};

const processingPost = (id, freelancerId) => {
    return api.put('Posts/ProcessPost?id=' + id + '&freelancerId=' + freelancerId);
};

const submitAssignment = (id, filePath) => {
    console.log('postId=' + id + ', filePath=' + filePath);
    return api.put('Posts/FinishPost', {
        postId: id, filePath
    });
};

const updatePost =  (id, title, description, featuredImage, price, duration, categories) => {
    return api.put('Posts/UpdatePost?id=' + id, {
        title,
        description,
        featuredImage,
        price,
        duration,
        categories
    });
};

const deletePost = (id) => {
    return api.delete('Posts/Delete?id=' + id);
};

const PostService = {
    getActivePosts,
    getHighestPosts,
    getPostById,
    getPostsByCategory,
    getPostRequestsByPostId,
    getCustomerLoggedInPosts,
    selectPost,
    unselectPost,
    submitAssignment,
    createPost,
    updatePost,
    processingPost,
    deletePost,
};

export default PostService;

