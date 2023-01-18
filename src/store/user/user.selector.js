// A selector is a method which takes the entire state and returns the information we want from it.
// Here we are selecting the current user from the user state from the entire state object.
export const selectCurrentUser = (entireState) => entireState.user.currentUser;