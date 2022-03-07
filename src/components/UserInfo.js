export default class UserInfo {
  constructor({ nameElm, jobElm }) {
    this._nameElm = document.querySelector(nameElm);
    this._jobElm = document.querySelector(jobElm);
  }

  setUserInfo(name, aboutMe) {
    this._nameElm.textContent = name;
    this._jobElm.textContent = aboutMe;
  }
  getUserInfo() {
    return {
      nameInfo: this._nameElm.textContent,
      aboutMeInfo: this._jobElm.textContent,
    };
  }
}
