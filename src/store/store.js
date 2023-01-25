import { compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { loggerMiddleware } from "./middleware/logger.middleware";

// root-reducer - combination of all reducers
// Store just needs the root reducer

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware is called before the reducer is called
// Middleware is an enhancer
const middleware = [process.env.NODE_ENV !== "production" && loggerMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Passes all of the enhancers
// Compose passes multiple functions left to right
const composedEnhancers = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);