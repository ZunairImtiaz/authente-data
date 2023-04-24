const initState = {
    sortField: 'createdAt',
    sortType: 'desc',
    searchValue: ''
};

function filterReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SORT_FIELD':
            return { ...state, sortField: action.value };
        case 'SET_SORT_TYPE':
            return { ...state, sortType: action.value };
        case 'SET_SEARCH_VALUE':
            return { ...state, searchValue: action.value };
    
        default:
            return state;
    };
};

export default filterReducer;