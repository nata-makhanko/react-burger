export type TBurgerIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
};

export type TBurgerConstructor = TBurgerIngredient & {
    uuid: string,
}

export type TTypeIngredients = {
    types: string[],
    title: string,
    position: string,
    refDrop: string
}


export type TOrderDetails = {
    success: boolean,
    name?: string,
    order?: {
        ingredients: TBurgerIngredient[],
        _id: string,
        owner: {
            name: string,
            email: string,
            createAt: string,
            updateAt: string,
        },
        status: string,
        name: string,
        createAt: string,
        updateAt: string,
        number: number,
        price: number,
    }
}



