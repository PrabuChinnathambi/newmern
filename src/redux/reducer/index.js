import {combineReducers} from 'redux';

import {current_user_reducer} from './current_user_reducer';

const reducers = combineReducers({
    user:current_user_reducer
});

export default reducers;