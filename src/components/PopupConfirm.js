import Popup from "./Popup";
import { elementTextModifying } from "../utils/utils";
export default class PopupConfirm extends Popup {
  constructor({ popupSelector, handleSubmitRemoveConfirm, initialBtnTxt }) {
    super(popupSelector);
    this._handleSubmitRemoveConfirm = handleSubmitRemoveConfirm;
    this._submitBtnElement = this._popupElement.querySelector(
      ".popup-box__submit-button"
    );
    this._initialBtnTxt = initialBtnTxt;
    this._elementTextModifying = elementTextModifying;
  }
  open(id, element) {
    super.open();
    this._element = element;
    this._id = id;
  }
  close() {
    super.close();
  }

  _handleConfirmSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitRemoveConfirm(
      this._id,
      this._element,
      this._submitBtnElement,
      this._initialBtnTxt
    );
  };

  setEventListeners() {
    this._submitBtnElement.addEventListener("click", this._handleConfirmSubmit);
    super.setEventListeners();
  }
}
