import baseUrl from "./config";

class Api {
  constructor(url) {
    this._baseUrl = url;
    this._cardsUrl = this._baseUrl + "/cards/";
    this._userProfileUrl = this._baseUrl + "/users/me/";
  }

  _handleOriginalResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result;
  }

  getCards() {
    return fetch(this._cardsUrl, {
      credentials: "include",
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  editProfile({ name, about }) {
    return fetch(this._userProfileUrl, {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  addCard({ name, link }) {
    return fetch(this._cardsUrl, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  deleteCard(id) {
    return fetch(this._cardsUrl + id, {
      credentials: "include",
      method: "DELETE",
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data;
      });
  }

  like(id) {
    return fetch(this._cardsUrl + id + "/likes/", {
      credentials: "include",
      method: "PUT",
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  removeLike(id) {
    return fetch(this._cardsUrl + id + "/likes/", {
      credentials: "include",
      method: "DELETE",
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  updateAvatar(avatar) {
    return fetch(this._userProfileUrl + "avatar/", {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }
}

const api = new Api(baseUrl);
export default api;
