import { ActionTypes } from '../contants/action_types';

const initialstate = {
    current_user: ""
}

export const current_user_reducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_CURRENTUSER:
            return state;
        case ActionTypes.SET_CURRENTUSER:
            return {
                ...state,
                current_user: state.current_user = payload
            }
            case ActionTypes.REMOVE_CURRENTUSER:
                return{
                    ...state,
                    current_user: state.current_user = ""
                }
        default:
            return state;
    }
} 