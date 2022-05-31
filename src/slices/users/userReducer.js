import { SET_USER, DELETE_USER } from "./userAction";

const initialState = {
    isLoading: false,
    isError: false,
    users: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                users: [...action.payload]
            };

        case DELETE_USER:
            const newState = state.users.filter((elem) => elem.id !== action.payload);
            return {
                ...state,
                users: newState,
            }
        default:
            return state;
    }
}

export default userReducer;

