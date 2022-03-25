import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFrom, btnText) {
    super(popupSelector);
    this._handleSubmitFrom = handleSubmitFrom;
    this._formElement = this._popupElement.querySelector(".popup-box__form");
    this._formBtn = this._formElement.querySelector(
      ".popup-box__submit-button"
    );
    this._btnText = btnText;
    this._inputList = [
      ...this._formElement.querySelectorAll(".popup-box__input"),
    ];
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitFrom(this._returnInputValObj(), this._formBtn);
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
    this._formBtn.textContent = this._btnText;
    super.open();
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
