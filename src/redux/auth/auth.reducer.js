import { authState } from "./auth.state";

export const authReducer = (state = authState, action) => {
  switch(action.type) {
    case 'set-auth-data': {
      return {
        ...state,
        personal_data: action.nickname,
        token: action.token
      }
    }

    case 'set-sign-up-error': {
      return {
        ...state,
        auth_error: action.error
      }
    }

    case 'set-is-login': {
      return {
        ...state,
        isLogin: action.isLogin
      }
    }

    default: {
      return state;
    }
  }
}

export const setAuthData = (nickname, token) => dispatch => {
  return dispatch({
    type: 'set-auth-data',
    nickname, token
  })
}

export const setSignUpError = (error) => dispatch => {
  console.log(error);
  return dispatch({
    type: 'set-sign-up-error',
    error
  })
}

export const setIsLogin = (isLogin) => dispatch => {
  return dispatch({
    type: 'set-is-login',
    isLogin
  })
}