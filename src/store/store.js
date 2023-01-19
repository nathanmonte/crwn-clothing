import { compose, createStore, applyMiddleware} from "redux";
import logger from "redux-logger"
import { rootReducer } from "./root-reducer";

// root-reducer - combination of all reducers
// Store just needs the root reducer
// Logger helps us see the inner working of the store

/**
 * Currying a function which returns another function to have a variable within a closure.
 */

const loggerMiddleware = (store) => (next) => (action) => {
    // Sometimes we don't receive a type as we didn't provide it.
    if (!action.type) {
        return next(action);
    }

    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("currentState", store.getState());

    // How does the store get the new state.
    // Once it's been updated from all of the reducers.
    // This is working synchronously, but redux logger is not working synchronously 
    next(action);

    console.log("next state: ", store.getState());
};

// Middleware is called before the reducer is called
// Middleware is an enhancer
const middleware = [loggerMiddleware];

// Passes all of the enhancers
// Compose passes multiple functions left to right
const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, composedEnhancers);