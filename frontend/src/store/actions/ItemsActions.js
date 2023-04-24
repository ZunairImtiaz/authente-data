import axios from "axios";
import { showError, hideError } from "./authActions";

const getItems = items => ({ type: 'GET_ITEMS', items });
const addItem = item => ({ type: 'ADD_ITEM', item });
const removeItem = id => ({ type: 'REMOVE_ITEM', id });
const updateItem = item => ({ type: 'UPDATE_ITEM', item });

const baseURL = process.env.REACT_APP_API_URL;

export function addItemReq(payload, navigate) {
    return async dispatch => {
        try {
            const response = await axios.post(`${baseURL}/items/create`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(addItem(response.data));
            dispatch(hideError());
            navigate('/');
        } catch (error) {
            console.log(error.response);
            dispatch(showError(error.response.data.details[0].message));
        };
    };
};

export function getItemsReq(filters) {
    const { sortField, sortType, searchValue } = filters;
    return async dispatch => {
        try {
            const response = await axios.get(`${baseURL}/items?sortby=${sortField}:${sortType}&searchby=${searchValue}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(getItems(response.data));
        } catch (error) {};
    };
};

export function updateItemReq(id,payload, navigate) {
    return async dispatch => {
        try {
            const response = await axios.put(`${baseURL}/items/edit/${id}`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(updateItem(response.data));
            dispatch(hideError());
            navigate('/');
        } catch (error) {
            dispatch(showError(error.response.data.details[0].message));
        };
    };
};

export function deleteItemReq(id) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${baseURL}/items/delete/${id}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            if (response.data.deletedCount === 1) {
                dispatch(removeItem(id));
            };
        } catch (error) {
            console.log(error.response);
        };
    };
};