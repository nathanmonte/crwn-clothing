import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

// A reducer is a method which produces new states by receiving the current state and an action.
// An action is comprised of two pieces
// 1. The type of action being performed. This is the name used by the switch statement.
// 2. The payload of data which we will use to modify the state into it's next version.
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}