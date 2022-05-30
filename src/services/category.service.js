import api from './api';
import axios from 'axios';

const API_URL = 'https://open-request-api.herokuapp.com/api/v1/';

const getCategories = () => {
    return axios.get(API_URL + 'Categories/Categories');
};

const getCategoryById = (id) => {
    return axios.get(API_URL + 'Categories/GetCategoryById?Id=' + id);
};

const createCategory = (cateName, description, featuredImage) => {
    console.log(cateName, description, featuredImage);
    return api.post('/Categories/AddCategory', {
        name: cateName,
        description,
        featuredImage,
    });
};

const updateCategory = (id, cateName, description, featuredImage) => {
    return api.put('/Categories/UpdateCategory?id=' + id, {
        name: cateName,
        description,
        featuredImage,
    });
}

const deleteCategory = async (id) => {
    return api.delete('/Categories/DeleteCategory?id=' + id);
}


const CategoryService = {
    getCategoryById,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}

export default CategoryService;