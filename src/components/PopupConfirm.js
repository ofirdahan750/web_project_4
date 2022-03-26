import Popup from "./Popup";
import { modifyElementText } from "../utils/utils";
export default class PopupConfirm extends Popup {
  constructor({ popupSelector, handleSubmitRemoveConfirm }) {
    super(popupSelector);
    this._handleSubmitRemoveConfirm = handleSubmitRemoveConfirm;
    this._submitBtnElement = this._popupElement.querySelector(
      ".popup-box__submit-button"
    );
    this._modifyElementText = modifyElementText;
  }
  open(id, element) {
    super.open();
    this._element = element;
    this._id = id;
  }
  handleLoading(txt = "Saving...", isDone = false) {
    this._submitBtnElement.disabled = !isDone ? true : false;
    this._modifyElementText(this._submitBtnElement, txt);
  }

  _handleConfirmSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitRemoveConfirm(this._id, this._element);
  };

  setEventListeners() {
    this._submitBtnElement.addEventListener("click", this._handleConfirmSubmit);
    super.setEventListeners();
  }
}
