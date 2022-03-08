export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  // _handleContextMenu = (e) => {
  //   e.preventDefault();
  // };
  // _handleMouseClose = (e) => {
  //   const {
  //     target: { classList },
  //   } = e;
  //   const contextMenuCode = 2;
  //   if (
  //     classList.contains("popup-box__wrapper") ||
  //     e.button === contextMenuCode
  //   )
  //     return;
  //   if (
  //     classList.contains("popup-box_visible") ||
  //     classList.contains("popup-box__close-button")
  //   ) {
  //     this.close();
  //   }
  // };
  _handleEscClose = (e) => {
    if (e.key == "Escape") {
      this.close();
    }
  };
  open() {
    this._popupElement.classList.add("popup-box_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup-box_visible");
    this.removeEventListeners();
  }
  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("contextmenu", this._handleContextMenu);

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
