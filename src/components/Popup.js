//Sergey Belskiy
//I hope everthing is okay right know , Yaroslav Denisenko review it before I submit, Please give me another try even though it's the last attempt.
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose = (e) => {
    if (e.key == "Escape") {
      this.close();
    }
  };
  open() {
    this._popupElement.classList.add("popup-box_visible");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("submit", this._handleFormSubmit);
  }

  close() {
    this._popupElement.classList.remove("popup-box_visible");
    this._removeEventListeners();
  }
  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._formSelector.addEventListener("submit", this._handleFormSubmit);
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
