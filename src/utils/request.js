export function checkResponse(response) {
    if (response && response.ok) {
        return response.json()
    } else {
        throw new Error(`Ошибка ${response.status}`);
    }

}

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}