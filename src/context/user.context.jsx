import { useState, createContext, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

// as the actual value for access
export const UserContext = createContext({
    currentUser: null, // should be set as null
    setCurrentUser: () => null // blank function
});

// jsx component which allows access to context.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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