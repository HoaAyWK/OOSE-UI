import { ADD_CATEGORY, UPDATE_CATEGORY, GET_ALL_CATEGORY} from './categoryAction'

const initialState = {
    isLoading: false,
    isError: false,
    categories: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORY:
            return action.payload;
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case UPDATE_CATEGORY:
            const category = state.categories.find((item) => item.id === action.payload.id);
            const newCategories = state.categories.filter((item) => item.id !== action.payload.id);
            const newCategory = { ...category, ...action.payload };
            return {
                ...state,
                categories: [...newCategories, newCategory],
            };
        default:
            return state;
    }
}

export default categoryReducer