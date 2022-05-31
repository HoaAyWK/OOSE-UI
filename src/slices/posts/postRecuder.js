import { ADD_POST, UPDATE_POST, DELETE_POST, GET_ALL_POST } from '../posts/postAction';

const initialState = {
    isLoading: false,
    isError: false,
    posts: [],
}

const postReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
            
        case UPDATE_POST:
            const post = state.posts.find(action.payload.id);
            const newPosts = state.posts.filter((item) => (item.id !== action.payload.id));
            const newPost = {
                ...post,
                ...action.payload,
            }
            const result = [...newPosts, newPost]
            return {
                ...state,
                posts: result,
            };
        
        case DELETE_POST:
            const newPostState = state.posts.filter((item) => (item.id !== action.payload.id));
            return {
                ...state,
                posts: newPostState,
            };

        case GET_ALL_POST:
            return {
                ...state,
                posts: action.payload,
            };
        default:
            return state;
    }
}

export default postReducer;