export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleContextMenu = (e) => {
    e.preventDefault();
  };
  _handleMouseClose = (e) => {
    const {
      target: { classList },
    } = e;
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
    this._popupElement.removeEventListener("click", this._handleMouseClose);
  };
  _handleEscClose = (e) => {
    if (e.key == "Escape") {
      this.close();
    }
  };
  open() {
    this._popupElement.classList.add("popup-box_visible");
  }

  close() {
    this._popupElement.classList.remove("popup-box_visible");
    this.removeEventListeners();
  }
  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
  }
}
