import { CATEGORY_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categoriesArray: []
}

export const categoryReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
    const {type, payload} = action;

    console.log(payload);
    switch (type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {...state, categoriesArray: payload}
        default:
            return state;
    }
};