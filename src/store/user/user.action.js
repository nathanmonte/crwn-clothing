import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

// An action is a method which dispatches the type of action we want redux to complete as well as the payload of data used to modify the state.
export const setCurrentUser = (user) =>  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
