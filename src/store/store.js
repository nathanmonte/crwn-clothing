import { compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import { rootReducer } from "./root-reducer";

// root-reducer - combination of all reducers
// Store just needs the root reducer
// Logger helps us see the inner working of the store

// Middleware is called before the reducer is called
// Middleware is an enhancer
const middleware = [logger];

// Passes all of the enhancers
// Compose passes multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, composedEnhancers);