class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  registrationUser(registrationData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: registrationData.email,
        password: registrationData.password
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

  authorizationUser(authorizationData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authorizationData.email,
        password: authorizationData.password
      })
    })
      .then(res => {
        return this._checkResponse(res);
      });

  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `${token}`
      }
    })
      .then(res => {
        return this._checkResponse(res);
      });
  }

}

/******************** class *******************/
/* apiAuth */
const apiAuth = new ApiAuth({
  baseUrl: 'http://api.mesto-psv.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuth;