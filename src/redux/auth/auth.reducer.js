import { authState } from "./auth.state";

export const authReducer = (state = authState, action) => {
  switch(action.type) {
    case 'set-auth-data': {
      return {
        ...state,
        personal_data: action.nickname
      }
    }

    case 'set-sign-up-error': {
      return {
        ...state,
        auth_error: action.error
      }
    }

    default: {
      return state;
    }
  }
}

export const setAuthData = (nickname) => dispatch => {
  console.log('here');
  return dispatch({
    type: 'set-auth-data',
    nickname
  })
}

export const setSignUpError = (error) => dispatch => {
  console.log(error);
  return dispatch({
    type: 'set-sign-up-error',
    error
  })
}