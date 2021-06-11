import { ActionTypes } from '../contants/action_types'

export const setCurrentUser = (user) => {
    return {
        type: ActionTypes.SET_CURRENTUSER,
        payload:user  
    };
};


export const removeCurrentUser = () => {
    return {
        type: ActionTypes.REMOVE_CURRENTUSER,
    };
};

export const getCurrentUser = () => {
    return {
        type: ActionTypes.GET_CURRENTUSER,
    };
};