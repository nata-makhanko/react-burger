import { dropConstructorReducer, initialState } from './drop-constructor';
import * as types from '../actions/drop-constructor';


const countIngredient = [
    {
        type: 'bun',
        _id: '0000000',
        count: 2,
    },
    {
        type: 'main',
        _id: '0000001',
        count: 3,
    },
    {
        type: 'sause',
        _id: '0000002',
        count: 2,
    }
];

const deleteIngredient = [
    {
        _id: '123',
        uuid: '8989',
        name: 'Grape',
        price: 67,
        image_mobile: '',
        type: 'main',
    },
    {
        _id: '009090',
        uuid: '090909',
        name: 'Banana',
        price: 46,
        image_mobile: '',
        type: 'main',
    }
];

const sumIngredients = [...deleteIngredient]

const ingredientsConstructorForTest = [
    {
        _id: '1234',
        uuid: '432',
        name: 'Fire bun',
        price: 67,
        image_mobile: '',
        type: 'bun',
    },
    {
        _id: '333',
        uuid: '567',
        name: 'Spasy',
        price: 54,
        image_mobile: '',
        type: 'sause',
    },
    {
        _id: '007',
        uuid: '009',
        name: 'Meat',
        price: 94,
        image_mobile: '',
        type: 'main',
    }
];

const INCREASE_INGREDIENT = types.INCREASE_INGREDIENT;


describe('drop constructor reducer', () => {
    it('should return the initial state', () => {
        expect(dropConstructorReducer(undefined, {})).toEqual(initialState)
    })

    it('case ADD_BUN', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: ingredientsConstructorForTest,

        }, {
            type: types.ADD_BUN,
            ingredient:
            {
                _id: '333',
                uuid: '432',
                name: 'Cold bun',
                price: 43,
                image_mobile: '',
                type: 'bun',
            }
        })).toEqual({
            ...initialState,
            ingredientsConstructor: [
                {
                    _id: '333',
                    uuid: '567',
                    name: 'Spasy',
                    price: 54,
                    image_mobile: '',
                    type: 'sause',
                },
                {
                    _id: '007',
                    uuid: '009',
                    name: 'Meat',
                    price: 94,
                    image_mobile: '',
                    type: 'main',
                },
                {
                    _id: '333',
                    uuid: '432',
                    name: 'Cold bun',
                    price: 43,
                    image_mobile: '',
                    type: 'bun',
                },
            ],
        })
    })

    it('case ADD_INGREDIENT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: ingredientsConstructorForTest,
        }, {
            type: types.ADD_INGREDIENT,
            ingredient: {
                _id: '007',
                uuid: '009',
                name: 'Meat',
                price: 94,
                image_mobile: '',
                type: 'main',
            }
        })).toEqual({
            ...initialState,
            ingredientsConstructor: [
                ...ingredientsConstructorForTest,
                {
                    _id: '007',
                    uuid: '009',
                    name: 'Meat',
                    price: 94,
                    image_mobile: '',
                    type: 'main',
                }
            ]
        })
    })

    it('case MOVE_INGREDIENT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: ingredientsConstructorForTest,
        }, {
            type: types.MOVE_INGREDIENT,
            hoverIndex: 1,
            dragIndex: 2,
        })).toEqual({
            ...initialState,
            ingredientsConstructor: [
                {
                    _id: '1234',
                    uuid: '432',
                    name: 'Fire bun',
                    price: 67,
                    image_mobile: '',
                    type: 'bun',
                },
                {
                    _id: '007',
                    uuid: '009',
                    name: 'Meat',
                    price: 94,
                    image_mobile: '',
                    type: 'main',
                },
                {
                    _id: '333',
                    uuid: '567',
                    name: 'Spasy',
                    price: 54,
                    image_mobile: '',
                    type: 'sause',
                },
            ]
        })
    })

    it(`case ${INCREASE_INGREDIENT} for buns`, () => {
        expect(dropConstructorReducer({
            ...initialState,
            countInggredients: countIngredient,

        }, {
            type: INCREASE_INGREDIENT,
            ingredient: {
                type: 'bun',
                _id: '0000000'
            }
        })).toEqual({
            ...initialState,
            countInggredients: countIngredient,
        })

        expect(dropConstructorReducer({
            ...initialState,
            countInggredients: countIngredient,

        }, {
            type: INCREASE_INGREDIENT,
            ingredient: {
                type: 'bun',
                _id: '0000005'
            }
        })).toEqual({
            ...initialState,
            countInggredients: [
                {
                    type: 'main',
                    _id: '0000001',
                    count: 3,
                },
                {
                    type: 'sause',
                    _id: '0000002',
                    count: 2,
                },
                {
                    type: 'bun',
                    _id: '0000005',
                    count: 2,
                }
            ],
        })


    })

    it(`case ${INCREASE_INGREDIENT} for ingredients`, () => {
        expect(dropConstructorReducer({
            ...initialState,
            countInggredients: countIngredient,
        }, {
            type: INCREASE_INGREDIENT,
            ingredient: {
                type: 'main',
                _id: '0000001',
            }
        })).toEqual({
            ...initialState,
            countInggredients: [
                {
                    type: 'bun',
                    _id: '0000000',
                    count: 2,
                },
                {
                    type: 'main',
                    _id: '0000001',
                    count: 4,
                },
                {
                    type: 'sause',
                    _id: '0000002',
                    count: 2,
                }
            ],
        })

        expect(dropConstructorReducer({
            ...initialState,
            countInggredients: countIngredient,
        }, {
            type: INCREASE_INGREDIENT,
            ingredient: {
                type: 'sause',
                _id: '0000034'
            }
        })).toEqual({
            ...initialState,
            countInggredients: [
                {
                    type: 'bun',
                    _id: '0000000',
                    count: 2,
                },
                {
                    type: 'main',
                    _id: '0000001',
                    count: 4,
                },
                {
                    type: 'sause',
                    _id: '0000002',
                    count: 2,
                },
                {
                    type: 'sause',
                    _id: '0000034',
                    count: 1,
                }
            ],
        })


    })

    it('case DECREASE_INGREDIENT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            countIngredient: countIngredient
        }, {
            type: types.DECREASE_INGREDIENT,
            _id: '0000001'
        })).toEqual({
            ...initialState,
            countIngredient: [
                {
                    type: 'bun',
                    _id: '0000000',
                    count: 2,
                },
                {
                    type: 'main',
                    _id: '0000001',
                    count: 4,
                },
                {
                    type: 'sause',
                    _id: '0000002',
                    count: 2,
                }
            ]
        })
    })

    it('case DELETE_INGREDIENT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: deleteIngredient,
        }, {
            type: types.DELETE_INGREDIENT,
            uuid: '8989'
        })).toEqual({
            ...initialState,
            ingredientsConstructor: [{
                _id: '009090',
                uuid: '090909',
                name: 'Banana',
                price: 46,
                image_mobile: '',
                type: 'main',
            }]
        })
    })

    it('case SUM_INGREDIENT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: sumIngredients,
        }, {
            type: types.SUM_INGREDIENT
        })).toEqual({
            ...initialState,
            ingredientsConstructor: sumIngredients,
            sumIngredients: 113
        })
    })

    it('case CLEAR_INGREDIENTS_CONSTRUCTOR', () => {
        expect(dropConstructorReducer({
            ...initialState,
            ingredientsConstructor: ingredientsConstructorForTest
        }, {
            type: types.CLEAR_INGREDIENTS_CONSTRUCTOR
        })).toEqual(initialState)
    })

    it('case CLEAR_INGREDIENTS_COUNT', () => {
        expect(dropConstructorReducer({
            ...initialState,
            countInggredients: countIngredient
        }, {
            type: types.CLEAR_INGREDIENTS_COUNT
        })).toEqual(initialState)
    })
})