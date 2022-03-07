export default class Popup {
  constructor(popupElm) {
    this._popupElm = document.querySelector(popupElm);
  }

  _handleContextMenu = (e) => {
    e.preventDefault();
  };
  _handleMouseClose = (e) => {
    const { target } = e;
    const { classList } = target;
    const contextMenuCode = 2;
    if (
      classList.contains("popup-box__wrapper") ||
      e.button === contextMenuCode
    )
      return;
    if (
      classList.contains("popup-box_visible") ||
      classList.contains("popup-box__close-button")
    ) {
      this.close();
    }
  };
  _handleEscClose = (e) => {
    if (e.key == "Escape") {
      this.close();
    }
  };
  open() {
    this._popupElm.classList.add("popup-box_visible");
    this.setEventListeners();
  }

  close() {
    this._popupElm.classList.remove("popup-box_visible");
    this.removeEventListeners();
  }
  removeEventListeners() {
    this._popupElm.removeEventListener("click", this._handleMouseClose);
    document.removeEventListener("contextmenu", this._handleContextMenu);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popupElm.addEventListener("mousedown", this._handleMouseClose);
    document.addEventListener("contextmenu", this._handleContextMenu);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
