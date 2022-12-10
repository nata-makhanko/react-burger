export const initialStateSelectIngredient = {
    selectIngredient: null,
};

export function selectReducer(state, action) {
    switch (action.type) {
        case "set":
            return { selectIngredient: action.payload };
        case "reset":
            return initialStateSelectIngredient;
        default:
            throw new Error(`Wrong type of action ${action.type}`);
    }
}

