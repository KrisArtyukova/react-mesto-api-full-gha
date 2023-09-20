import {USER_TOKEN} from "./constants";

class Api {
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

  getInitialCards() {
    return this._request("cards", {
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      }
    });
  }

  async addCard(name, link) {
    return await this._request("cards", {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`},
      body: JSON.stringify({
        name,
        link,
      })
    });
  }

  async deleteCard(id) {
    return await this._request(`cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      }
    });
  }

  async addLike(id) {
    return await this._request(`cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      }
    });
  }

  async deleteLike(id) {
    return await this._request(`cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      }
    });
  }

  async getUserInfo() {
    return await this._request("users/me", {
      headers: {
        authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      }
    });
  }

  async editUserInfo(name, about) {
    return await this._request("users/me", {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`},
      body: JSON.stringify({
        name,
        about,
      })
    });
  }

  async editUserAvatar(avatar) {
    return await this._request("users/me/avatar", {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`},
      body: JSON.stringify({
        avatar,
      })
    });
  }

}

export const api = new Api({
  baseUrl: 'https://krismestoback.nomoredomainsrocks.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
