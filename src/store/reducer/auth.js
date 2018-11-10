import * as actionTypes from '../action/actionTypes';
import {updatedObject} from '../../shared/utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updatedObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        idToken: action.idToken,
        userId: action.localId, 
        error: null, 
        loading: false})
}

const authFail = (state, action) => {
    return updatedObject(state,{
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updatedObject(state, {
        idToken: null,
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state,{
        authRedirectPath: action.path
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;