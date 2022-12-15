export function checkResponse(res) {
    if (res.ok) {
        const data = res.json();
        return data;
    } else {
        throw new Error(`Ошибка ${res.status}`);
    }
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}