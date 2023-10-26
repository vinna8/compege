import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import authReducer  from "./auth-reducer";
import taskReducer from "./task-reducer";
import groupReducer from './group-reducer';
import thunkMiddleware from 'redux-thunk'; 
import noteReducer from './note-reducer';

let reducers = combineReducers({
    auth: authReducer,
    task: taskReducer,
    group: groupReducer,
    note: noteReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;