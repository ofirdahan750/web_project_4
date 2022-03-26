import Popup from "./Popup.js";
import { modifyElementText } from "../utils/utils";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitFrom) {
    super(popupSelector);
    this._handleSubmitFrom = handleSubmitFrom;
    this._formElement = this._popupElement.querySelector(".popup-box__form");
    this._formBtn = this._formElement.querySelector(
      ".popup-box__submit-button"
    );

    this._inputList = [
      ...this._formElement.querySelectorAll(".popup-box__input"),
    ];
    this._modifyElementText = modifyElementText;
  }

  _handleFormSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitFrom(this._returnInputValObj());
  };
  handleLoading(txt = "Saving...", isDone = false) {
    this._formBtn.disabled = !isDone ? true : false;
    this._modifyElementText(this._formBtn, txt);
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
    this._formElement.reset();
  }
  setEventListeners() {
    this._formElement.addEventListener("submit", this._handleFormSubmit);
    super.setEventListeners();
  }
}
