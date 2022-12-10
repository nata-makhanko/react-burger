export const initialStateConstructor = {
    constructorBurger: [],
};

export function constructorReducer(state, action) {
    switch (action.type) {
        case "set":
            return { constructorBurger: [...state.constructorBurger, action.payload] };
        case "reset":
            return initialStateConstructor;
        case 'refresh':
            let arrWithoutBuns = state.constructorBurger.map(ingredient => {
                if (ingredient.type !== 'bun') {
                    return ingredient;
                }
            });
            let arrWithoutEmprtyValues = arrWithoutBuns.filter(ingredient => ingredient !== undefined);
            return { constructorBurger: [...arrWithoutEmprtyValues, action.payload] }
        default:
            throw new Error(`Wrong type of action ${action.type}`);
    }
}

