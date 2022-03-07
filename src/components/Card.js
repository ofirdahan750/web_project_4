
export class Card {
  constructor(data, openImgPopup, cardSelector) {
    const { name, link } = data;
    this._name = name;
    this._link = link;
    this._openImgPopup = openImgPopup;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const placeItemTemplate = document.querySelector(
      this._cardSelector
    ).content;
    const cardElement = placeItemTemplate
      .querySelector(".places__item")
      .cloneNode(true);

    return cardElement;
  }
  _handleToggleLikedBtn(e) {
    e.stopPropagation();
    this._placeLikeBtn.classList.toggle("places__like-btn__active");
  }
  _handleRemoveItem(e) {
    e.stopPropagation();
    this._cardItem.remove();
  }

  _setEventListeners() {
    this._cardItem.addEventListener("click", () => {
      this._openImgPopup(this._name, this._link);
    });
    this._placeLikeBtn.addEventListener("click", (e) => {
      this._handleToggleLikedBtn(e);
    });
    this._cardItem
      .querySelector(".places__remove-btn")
      .addEventListener("click", (e) => {
        this._handleRemoveItem(e);
      });
  }

  generateCard() {
    this._cardItem = this._getTemplate();
    this._placeImg = this._cardItem.querySelector(".places__img");
    this._placeLikeBtn = this._cardItem.querySelector(".places__like-btn");
    this._setEventListeners();
    this._placeImg.style.backgroundImage = `url(${this._link})`;
    this._placeImg.alt = `a photo of ${this._name}`;
    this._cardItem.querySelector(".places__name").textContent = `${this._name}`;
    return this._cardItem;
  }
}
