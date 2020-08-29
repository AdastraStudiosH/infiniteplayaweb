import { userState } from "./user.state";

export const userReducer = (state = userState, action) => {
    switch(action.type) {
        case 'set-user-data': {
            return {
                ...state,
                user: action.user
            }
        }
        
        default: {
            return state;
        }
    }
}

export const setUserData = (user) => dispatch => {
    return dispatch({
        type: 'set-user-data',
        user
    })
}