import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit';



const persistConfig = {
    key: 'root',
    varsion: 1,
    storage
}


const reducer = combineReducers({
    auth : authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer)


const store = configureStore({
    reducer : persistedReducer
});


export default store;