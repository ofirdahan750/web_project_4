import { openPopup } from "./utils.js";

const popupImgSection = document.querySelector(".popup-box_type_img");
const popupImg = document.querySelector(".popup-box__img");
const popupImgTitle = document.querySelector(".popup-box__img-title");

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
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
    this.classList.toggle("places__like-btn__active");
  }
  _handleRemoveItem(e) {
    e.stopPropagation();
    this._cardItem.remove();
  }
  _handleImgPopup() {
    popupImg.src = this._link;
    popupImg.alt = `a pictrue of ${this._name}`;
    popupImgTitle.textContent = this._name;
  }
  _setEventListeners() {
    this._placeImg.addEventListener("click", this._handleImgPopup());
    this._placeImg.addEventListener("click", () => {
      openPopup(popupImgSection);
    });
    this._cardItem
      .querySelector(".places__like-btn")
      .addEventListener("click", this._handleToggleLikedBtn);
    this._cardItem
      .querySelector(".places__remove-btn")
      .addEventListener("click", (e) => {
        this._handleRemoveItem(e);
      });
  }

  generateCard() {
    this._cardItem = this._getTemplate();
    this._placeImg = this._cardItem.querySelector(".places__img");
    this._setEventListeners();
    this._placeImg.style.backgroundImage = `url(${this._link})`; //This line is refers to the Place item img and not the popup!The function that's changes the popup is _handleImgPopup()
    this._placeImg.alt = `a photo of ${this._name}`;
    this._cardItem.querySelector(".places__name").textContent = `${this._name}`;
    return this._cardItem;
  }
}
