import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import { rootReducer } from "./root-reducer";
//import thunk from "redux-thunk";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "@redux-saga/core";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(Boolean);
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);