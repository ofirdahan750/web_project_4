import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imgSelector, imgTitleSelector }) {
    super(popupSelector);
    this._imgElement = this._popupElement.querySelector(imgSelector);
    this._titleElement = this._popupElement.querySelector(imgTitleSelector);
  }

  _setPopupImg() {
    this._titleElement.textContent = this.title;
    this._imgElement.src = this._link;
    this._imgElement.alt = `a pictrue of ${this.title}`;
  }

  open(title, link) {
    this.title = title;
    this._link = link;
    this._setPopupImg();
    super.open();
  }
}
