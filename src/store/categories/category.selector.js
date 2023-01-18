export const selectCategoryMap = (entireState) => {
    console.log("Selector fired");
    return entireState.categories.categoriesArray.reduce((accumulator, category) => {
        const {title, items} = category;

        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {});
}