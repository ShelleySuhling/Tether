import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers/rootReducer'

export default function configureStore(preloadedState) {

    const persistConfig = {
        key: 'root',
        storage: storage,
    };
    const pReducer = persistCombineReducers(persistConfig, rootReducer);

    const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
    const persistor = persistStore(store);
    window.store = store;

    return { persistor, store }
}