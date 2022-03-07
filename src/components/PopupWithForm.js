import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFrom) {
    super(popupSelector);
    this._handleSubmitFrom = handleSubmitFrom;
    this._formSelector = this._popupElement.querySelector(".popup-box__form");
    this._inputList = [
      ...this._formSelector.querySelectorAll(".popup-box__input"),
    ];
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitFrom(this._returnInputValObj());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", this._handleFormSubmit);
    this._popupElement.addEventListener("mousedown", this._handleMouseClose);
    document.addEventListener("contextmenu", this._handleContextMenu);
  }

  removeEventListeners() {
    super.removeEventListeners();
    document.removeEventListener("contextmenu", this._handleContextMenu);
    this._formSelector.removeEventListener("submit", this._handleFormSubmit);
  }
  _returnInputValObj() {
    const valInputObj = {};
    this._inputList.forEach((item) => {
      valInputObj[item.name] = item.value;
    });
    return valInputObj;
  }
  close() {
    super.close();

    this._formSelector.reset();
  }
}
