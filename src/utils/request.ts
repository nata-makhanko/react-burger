import { _apiBase } from "../services/api";
import { setCookie, getCookie } from "./cookies";

export function checkResponse(response: Response) {
    if (response?.ok) {
        return response.json();
    } else {
        return response.json().then(error => Promise.reject(error));
    }

}

type TRequestOptions = {
    method: "GET" | "POST" | "PATCH",
    headers: {
        "Content-type": string,
        Authorization?: string,
    },
    body?: string,
}

export async function requestWithToken(url: string, options: TRequestOptions) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (e) {
        if ((e as { message: string }).message === 'jwt malformed' || (e as { message: string }).message === 'jwt expired') {
            const refresh = await fetch(`${_apiBase}/auth/token`, {
                method: "POST",
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });
            const data = await checkResponse(refresh);
            const authToken = (data as { [key: string]: string }).accessToken.split('Bearer ')[1];
            setCookie('token', authToken, { 'max-age': 1200 });
            localStorage.setItem('refreshToken', (data as { [key: string]: string }).refreshToken);
            options.headers.Authorization = 'Bearer ' + getCookie('token');
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            throw new Error(`Ошибка ${(e as { status: string }).status}`);
        }
    }
}