const initState = [];

function itemsReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_ITEMS':
            return [ ...action.items ];
        case 'ADD_ITEM':
            return [ ...state, action.item ];
        case 'REMOVE_ITEM':
            return state.filter(item => item._id !== action.id);
        case 'UPDATE_ITEM':
            return state.map(item => {
                if (item._id === action.item._id) {
                    return { ...action.item };
                } else {
                    return item;
                };
            });
        default:
            return state;
    };
};

export default itemsReducer;