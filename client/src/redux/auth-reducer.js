import { authAPI } from "../api/api";
import { instance } from "../api/api";
import { clearAuthUserData, setAuthUserData, setErrorAuth, setErrorReg, toggleIsFetching, isDisabled,
    setStatisticData, updateStat, getUsers } from "./actions";
import  { SET_USER_DATA,  SET_ERROR_AUTH, SET_ERROR_REG, CLEAR_USER_DATA, TOGGLE_IS_FETCHING, 
    DISABLED, SET_STATISTIC_DATA, UPDATE_STATISTIC, GET_ALL_USERS } from "./types";

let initialState = {
    user: [],
    isAuth: false,
    isFetching: false,
    isDisabled: false,
    messageErrorAuth: null,
    messageErrorReg: null,
    statistic: [],
    allUsers: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_STATISTIC_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_ERROR_AUTH:
            return {
                ...state,
                ...action.data,
            }
        case SET_ERROR_REG:
            return {
                ...state,
                ...action.data,
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                isAuth: false
                }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case DISABLED:
            return {
                ...state, 
                isDisabled: action.isDisabled
            }
        case UPDATE_STATISTIC:
            return {
                ...state, 
                ...action.data,
            }
        case GET_ALL_USERS:
            return {
                ...state, 
                ...action.data,
            }
        default:
            return state;
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(isDisabled(true));
        dispatch(toggleIsFetching(true));
        authAPI.login(email, password)
        .then(response => {
            dispatch(isDisabled(false));
            dispatch(toggleIsFetching(false));
            if (response.data.token){
                localStorage.setItem('token', response.data.token);
                instance.defaults.headers.common['Authorization'] = `${localStorage.token}`;
                localStorage.setItem('user', response.data.user.userId)
                let user = response.data.user;
                let statistic = response.data.statistic;
                dispatch(setErrorAuth(null));
                dispatch(setAuthUserData(user));
                dispatch(setStatisticData(statistic));
                console.log(user)
                console.log(statistic)
            }
        })
        .catch(error => {
            dispatch(toggleIsFetching(false));
            let messageErrorAuth = error.response.data.message;
            dispatch(setErrorAuth(messageErrorAuth));
            dispatch(isDisabled(false));
        })
    }
}

export const registration = (login, email, password, lastName, firstName, patronymic) => {
    return (dispatch) => {
        dispatch(isDisabled(true));
        authAPI.registration(login, email, password, lastName, firstName, patronymic)
        .then(response => {
                dispatch(isDisabled(false));
                console.log(response)
                dispatch(setErrorReg(null));
            }
        )
        .catch(error => {
            let messageErrorReg = error.response.data.message;
            dispatch(setErrorReg(messageErrorReg));
            dispatch(isDisabled(false));
        })
    }
}

/*export const auth = () => {
    return (dispatch) => {
        authAPI.auth()
        .then(response => {
            if (response.data.token){
                localStorage.setItem('token', response.data.token);
                instance.defaults.headers.common['Authorization'] = `${localStorage.token}`;
                let user = response.data.user;
                dispatch(setAuthUserData(user));
        } else {
                let message = response.data.error.message;
                localStorage.removeItem('token');
            }
        })
    }
}*/

/*export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.auth()
        .then(response => {
            let user = response.data.user;
            dispatch(setAuthUserData(user));
            console.log(user)
            })
    }
}

export const login = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password)
        .then(response => {
            if (response.data.token){
                localStorage.setItem('token', response.data.token);
                instance.defaults.headers.common['Authorization'] = `${localStorage.token}`;
                let user = response.data.user;
                console.log(user)
                dispatch(getAuthUserData());
                console.log(user)
            } else {
                let message = response.data.error.message
            }
        })
    }
}*/

export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(clearAuthUserData());
    }
}

export const updateStatistics = (login, statistic) => {
    return (dispatch) => {
        dispatch(updateStat(statistic));
        authAPI.updateStat(login, statistic)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }
}

export const getAllUsers = () => {
    return (dispatch) => {
        authAPI.allUsers()
        .then(response => {
            let allUsers = response.data
            console.log(allUsers)
            dispatch(getUsers(allUsers));
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export default authReducer;