import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import itemsReducer from './reducers/itemsReducer';
import filterReducer from './reducers/filtersReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    items: itemsReducer,
    filters: filterReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;