import axios from 'axios';

const authStart = () => ({ type: 'AUTH_START' });
const authSuccess = (token, user) => ({ type: 'AUTH_SUCCESS', token, user});
const authFail = error => ({ type: 'AUTH_FAIL', error });
const editUserSuccess = user => ({ type: 'EDIT_USER_SUCCESS', user });
const logout = () => {
    localStorage.removeItem('token');
    return { type: 'LOGOUT'}
};

const baseURL = process.env.REACT_APP_API_URL;

export function serverLogout() {
    return async dispatch => {
        try {
            await axios.patch(baseURL+'/auth/logout', null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(logout());
        } catch (error) {
            dispatch(logout());
        };
    };
};

export function signup(authData) {
    return async dispatch => {
        dispatch(authStart());
        try {
            const response = await axios.post(baseURL+'/auth/signup', authData);
            localStorage.setItem('token', response.data.token);
            dispatch(authSuccess(response.data.token, response.data.user));
        } catch (error) {
            let err;
            if (error.response.data.details) {
                err = error.response.data.details[0].message;
            } else if (error.response.data.keyPattern) {
                err = 'this email already exist!';
            } else {
                err = 'invalid request!';
            }
            dispatch(authFail(err));
        };
    };
};

export function signin(email,password) {
    return async dispatch => {
        dispatch(authStart());
        const authData = { email, password };
        try {
            const response = await axios.post(baseURL+'/auth/signin', authData);
            localStorage.setItem('token', response.data.token);
            dispatch(authSuccess(response.data.token, response.data.user));
        } catch (error) {
            dispatch(authFail(error.response.data.message));
        };
    };
};

export function authCheckState() {
    return async dispatch => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(baseURL+'/auth/me', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(authSuccess(token, response.data));
        } catch (error) {
            dispatch(logout());
        };
    };
};

export function updateUser(updateData) {
    return async dispatch => {
        try {
            const response = await axios.put(baseURL+'/auth/edit', updateData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(editUserSuccess(response.data));
            dispatch(closeModel());
        } catch (error) {
            dispatch(authFail(error.response.data.message));
        };
    };
};

export function changePassword(passwords) {
    return async dispatch => {
        try {
            await axios.patch(baseURL+'/auth/editpassword', passwords,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(closeModel());
        } catch (error) {
            dispatch(authFail(error.response.data.message));
        };
    };
};

export const showModel = () => ({ type: 'SHOW_MODEL_UI' });
export const closeModel = () => ({ type: 'CLOSE_MODEL_UI' });
export const editProfile = () => ({ type: 'EDIT_PROFILE_UI' });
export const editPassword = () => ({ type: 'EDIT_PASSWORD_UI' });

export const showError = error => ({ type: 'SHOW_ERROR', error });
export const hideError = () => ({ type: 'HIDE_ERROR'});