export const initialStateApi = {
    responseData: null,
    isFetching: true,
    error: null,
};

export function apiReducer(state, action) {
    switch (action.type) {
        case "fetched":
            return {
                ...state,
                isFetching: false,
                responseData: action.payload,
            };
        case "error":
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
