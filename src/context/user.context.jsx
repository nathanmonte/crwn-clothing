import { useReducer } from "react";
import { createContext } from "react";
import { rootReducer } from "../store/root-reducer";

// as the actual value for access
export const UserContext = createContext({
    currentUser: null, // should be set as null
    setCurrentUser: () => null // blank function
});

// jsx component which allows access to context.
export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(rootReducer);



    const value = { currentUser };



    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/**
 * Always return a new object.
 * const userReducer = (state, action) => {
 * return {
 *  currentUser: 
 * }}
 */