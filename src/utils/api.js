import { apiConfig } from "./constants";

class Api {
  constructor(config) {
    this._token = config.token;
    this._userProfileUrl = config.userProfileUrl;
    this._cardsUrl = config.cardsUrl;
  }

  _handleOriginalResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result;
  }

  getUserInfo() {
    return fetch(this._userProfileUrl, {
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  editProfile({ name, about }) {
    return fetch(this._userProfileUrl, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  addCard({ name, link }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  deleteCard(id) {
    return fetch(this._cardsUrl + id, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data;
      });
  }

  like(id) {
    return fetch(this._cardsUrl + "likes/" + id, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  removeLike(id) {
    return fetch(this._cardsUrl + "likes/" + id, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => {
        return data.json();
      });
  }

  updateAvatar(avatar) {
    return fetch(this._userProfileUrl + "avatar/", {
      method: "PATCH",
      headers: {
        authorization: this._token,
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

const api = new Api(apiConfig);
export default api;
