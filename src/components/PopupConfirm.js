import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor({ popupSelector, handleSubmitRemoveConfirm }) {
    super(popupSelector);
    this._handleSubmitRemoveConfirm = handleSubmitRemoveConfirm;
    this._submitBtnElement = this._popupElement.querySelector(
      ".popup-box__submit-button"
    );
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
    this._handleSubmitRemoveConfirm(this._id, this._element);
    this.close();
  };

  setEventListeners() {
    this._submitBtnElement.addEventListener("click", this._handleConfirmSubmit);
    super.setEventListeners();
  }
}
