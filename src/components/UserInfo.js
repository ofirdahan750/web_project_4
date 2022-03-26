export default class UserInfo {
  constructor({ nameElm, jobElm, picElm }) {
    this._nameElm = document.querySelector(nameElm);
    this._jobElm = document.querySelector(jobElm);
    this._picElm = document.querySelector(picElm);
  }

  setUserInfo({ name, about, _id }) {
    this._nameElm.textContent = name;
    this._jobElm.textContent = about;
    this._userId = _id;
  }
  getUserInfo() {
    return {
      nameInfo: this._nameElm.textContent,
      aboutMeInfo: this._jobElm.textContent,
    };
  }
  getUserId() {
    return this._userId;
  }
  setPictureProfile(picSrc) {
    this._picElm.style.backgroundImage = `url("${picSrc}")`;
  }
}
