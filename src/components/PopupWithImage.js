import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, imgSelector, imgTitleSelector }) {
    super(popupSelector);
    this._imgSelector = this._popupElement.querySelector(imgSelector);
    this._titleSelector = this._popupElement.querySelector(imgTitleSelector);
  }

  _setPopupImg() {
    this._titleSelector.textContent = this.title;
    this._imgSelector.src = this._link;
    this._imgSelector.alt = `a pictrue of ${this.title}`;
  }

  open(title, link) {
    this.title = title;
    this._link = link;
    this._setPopupImg();

    super.open();
    this._popupElement.addEventListener("mousedown", this._handleMouseClose);
  }
}