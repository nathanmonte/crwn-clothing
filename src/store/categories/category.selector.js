import { createSelector } from "reselect";

// Create selector memoizes selectors to prevent re-renderings when a value hasn't changed.

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    // Input selector - what data do we want to select from?
    [selectCategoryReducer],
    // Output selector - If this is different then re-run the method using strict equality.
    (categoriesSlice) => categoriesSlice.categoriesArray
    
)

export const selectCategoryMap = createSelector(
    [selectCategories],
    // If the categoriesArray has not changed give me the previous calculated value.
    (categories) => categories.reduce((accumulator, category) => {
            const {title, items} = category;

            accumulator[title.toLowerCase()] = items;
            return accumulator;
        }, {})
    
) 