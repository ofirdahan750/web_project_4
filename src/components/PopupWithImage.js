import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupElm, imgElm, imgTitleElm }) {
    super(popupElm);
    this._imgElm = this._popupElm.querySelector(imgElm);
    this._titleElm = this._popupElm.querySelector(imgTitleElm);
  }

  _setPopupImg() {
    this._titleElm.textContent = this.title;
    this._imgElm.src = this._link;
    this._imgElm.alt = `a pictrue of ${this.title}`;
  }

  open(title, link) {
    this.title = title;
    this._link = link;
    this._setPopupImg();
    super.open();
  }
}
