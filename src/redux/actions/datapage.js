import httpClient from './../../utils/httpClient';
import {setNoMessage} from "./message";

export const SET_DATAPAGE_USERINWAITING = 'SET_DATAPAGE_USERINWAITING';
export const SET_DATAPAGE_DETAILLOCATION = 'SET_DATAPAGE_DETAILLOCATION';
export const SET_PLANNING = 'SET_PLANNING';
/**
 * Call /User/userInWaiting Url, pour récupérer tous les utilisateurs en attente de validation
 * @returns {Function}
 */
export const fetchUserInValidation = () => {
    return dispatch => {
        httpClient.request({
            url: '/User/userInWaiting',
            method: 'GET',
        }).then(response => {
            dispatch(setUserInWaiting(response.data));
            dispatch(setNoMessage());
        })
    }
};


export const fetchGetLocation = (id, success) => {
    return dispatch => {
        httpClient.request({
            url: `/Location/${id}`,
            method: 'GET',
        }).then(response => {
            dispatch(setLocationDetail(response.data));
            success && success(response.data);
        })
    }
};

export const setUserInWaiting = users => {
    return {type: SET_DATAPAGE_USERINWAITING, users}
};

export const setLocationDetail = location => {
    return {type: SET_DATAPAGE_DETAILLOCATION, location}
};

export const setPlanning = planning => {
    return {type: SET_PLANNING, planning}
};