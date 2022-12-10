export const initialStateOrder = {
    orderNumber: null,
};

export function orderReducer(state, action) {
    switch (action.type) {
        case "set":
            return { orderNumber: action.payload };
        case "reset":
            return initialStateOrder;
        default:
            throw new Error(`Wrong type of action ${action.type}`);
    }
}

