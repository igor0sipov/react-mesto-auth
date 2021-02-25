import baseUrl from "./config";

class Auth {
  constructor() {
    this._baseUrl = baseUrl;
  }

  _handleOriginalResponse(result) {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
    return result;
  }

  signIn({ email, password }) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  signUp({ email, password, name, about, avatar }) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
        about,
        avatar,
      }),
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  getUser() {
    return fetch(this._baseUrl + "/users/me", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }

  logout() {
    return fetch(this._baseUrl + "/signout", {
      method: "POST",
      credentials: "include",
    });
  }
}

const auth = new Auth();

export default auth;
