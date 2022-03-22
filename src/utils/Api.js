export default class Api {
  constructor({ baseUrl, headers }) {
    this.headers = headers;
    this.baseUrl = baseUrl;
  }
  _onHttpRequest(url, method, data) {
    const fullUrl = `${this.baseUrl}${url}`;
    return fetch(fullUrl, {
      method,
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
  getInitInfo() {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  }
  _getUserInfo() {
    return this._onHttpRequest("users/me", "GET");
  }
  _getInitialCards() {
    return this._onHttpRequest("cards", "GET");
  }
 
  setUserInfo({name,about}) {
    return this._onHttpRequest("users/me", "PATCH",{name,about});
  }
  addNewCard({name,link}) {
    return this._onHttpRequest('cards','post',{name,link})
  }
}
