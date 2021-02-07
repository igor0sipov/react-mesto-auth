class Auth {
  constructor() {
    this._baseUrl = "https://auth.nomoreparties.co";
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

  signUp({ email, password }) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
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

  getUser(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(this._handleOriginalResponse)
      .then((data) => data.json());
  }
}

const auth = new Auth();

export default auth;
