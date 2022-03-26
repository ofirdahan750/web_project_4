export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (e) => {
    if (e.key == "Escape") {
      this.close();
    }
  };
  _handleContextMenu = (e) => {
    e.preventDefault();
  };
  open() {
    this._popupElement.classList.add("popup-box_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup-box_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  handleLoading(btn, txt = "Saving...", isDone = false) {
    btn.disabled = !isDone ? true : false;
    this._elementTextModifying(btn, txt);
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("popup-box_visible") ||
        e.target.classList.contains("popup-box__close-button")
      ) {
        this.close();
      }
    });
  }
}
