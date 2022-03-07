import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElm, handleSubmitFrom) {
    super(popupElm);
    this._handleSubmitFrom = handleSubmitFrom;
    this._formEl = this._popupElm.querySelector(".popup-box__form");
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitFrom(this._returnInputValArr());
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._formEl.addEventListener("submit", this._handleFormSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._formEl.removeEventListener("submit", this._handleFormSubmit);
  }
  _returnInputValArr() {
    const valInputObj = {};
    [...this._formEl.querySelectorAll(".popup-box__input")].forEach((item) => {
      valInputObj[item.name] = item.value;
    });
    return valInputObj;
  }
  close() {
    super.close();
    this._formEl.reset();
  }
}
