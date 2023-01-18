import { useReducer } from "react";
import { createContext, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// as the actual value for access
export const UserContext = createContext({
    currentUser: null, // should be set as null
    setCurrentUser: () => null // blank function
});

export const SET_CURRENT_USERS = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CURRENT_USERS.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// jsx component which allows access to context.
export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(createAction(SET_CURRENT_USERS.SET_CURRENT_USER, user));
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDocumentFromAuth(user);
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/**
 * Always return a new object.
 * const userReducer = (state, action) => {
 * return {
 *  currentUser: 
 * }}
 */