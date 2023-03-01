import { _apiBase } from "../services/api";
import { setCookie, getCookie } from "./cookies";

export function checkResponse(response) {
    if (response?.ok) {
        return response.json();
    } else {
        return response.json().then(error => Promise.reject(error));
    }

}

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

export async function requestWithToken(url, options) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (e) {
        if (e.message === 'jwt malformed' || e.message === 'jwt expired') {
            const refresh = await fetch(`${_apiBase}/auth/token`, {
                method: "POST",
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });
            const data = await checkResponse(refresh);
            const authToken = data.accessToken.split('Bearer ')[1];
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', data.refreshToken);
            options.headers.Authorization = 'Bearer ' + getCookie('token');
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            throw new Error(`Ошибка ${e.status}`);
        }
    }
}