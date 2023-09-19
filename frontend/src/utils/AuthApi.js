import { USER_TOKEN } from "./constants";

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async _request(url, options) {
    const res = await fetch(`${this._baseUrl}/${url}`, options);
    return this._checkResponse(res);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async registrate(password, email) {
    return await this._request("signup", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      })
    });
  }

  async login(password, email) {
    return await this._request("signin", {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email,
      })
    });
  }

  async checkAuth() {
    const token = localStorage.getItem(USER_TOKEN);
    if (!token) throw new Error('Отсутствует токен');

    return await this._request("users/me", {
      method: 'GET',
      headers: { ...this._headers, "Authorization": `Bearer ${token}`},
    });
  }

}

export const authApi = new AuthApi({
  baseUrl: 'https://krisMestoBack.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
