import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFrom) {
    super(popupSelector);
    this._handleSubmitFrom = handleSubmitFrom;
    this._formElement = this._popupElement.querySelector(".popup-box__form");
    this._inputList = [
      ...this._formElement.querySelectorAll(".popup-box__input"),
    ];
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitFrom(this._returnInputValObj());
    this.close();
  };

  _returnInputValObj() {
    const valInputObj = {};
    this._inputList.forEach((item) => {
      valInputObj[item.name] = item.value;
    });
    return valInputObj;
  }
  open() {
    super.open();
    this._formElement.addEventListener("submit", this._handleFormSubmit);
  }
  close() {
    super.close();
    this._formElement.removeEventListener("submit", this._handleFormSubmit);
    this._formElement.reset();
  }
}
