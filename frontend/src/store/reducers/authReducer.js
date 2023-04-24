const initState = { 
    token: null,
    user: null,
    error: null, 
    loading: false, 
    showModel: false, 
    editProfile: true 
};

function authReducer(state = initState, action) {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, error: null, loading: true };
        case 'AUTH_SUCCESS':
            return { 
                ...state, 
                token: action.token, 
                user: action.user, 
                loading: false, 
                error: null 
            };
        case 'AUTH_FAIL':
            return { ...state, error: action.error, loading: false };
        case 'LOGOUT':
            return { ...state, token: null, user: null };
        case 'EDIT_USER_SUCCESS':
            return { ...state, user: action.user };
        case 'EDIT_PASSWORD_FAIL':
            return { ...state, error: action.error };
        case 'SHOW_MODEL_UI':
            return { ...state, showModel: true };
        case 'CLOSE_MODEL_UI':
            return { ...state, showModel: false };
        case 'EDIT_PROFILE_UI':
            return { ...state, editProfile: true };
        case 'EDIT_PASSWORD_UI':
            return { ...state, editProfile: false };
        case 'SHOW_ERROR':
            return { ...state, error: action.error };
        case 'HIDE_ERROR':
            return { ...state, error: null };

        default:
            return state;
    };
};

export default authReducer;