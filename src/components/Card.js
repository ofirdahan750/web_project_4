import { getRandomString } from "../utils/utils.js";
export class Card {
  constructor(
    data,
    handleImageClick,
    openRemoveItemPopup,
    cardInfo,
    cardSelector
  ) {
    const { name, link, _id } = data;
    const { likes, isOwner, likedByCurrUser } = cardInfo;
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
    this._openRemoveItemPopup = openRemoveItemPopup;
    this._cardSelector = cardSelector;
    this._likes = likes || [];
    this._isOwner = isOwner || false;
    this._likedByCurrUser = likedByCurrUser;
    this._id = _id || getRandomString();
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
    // console.log(this._isOwner)
    this._openRemoveItemPopup(this._id, this._cardItem);
    // this._cardItem.remove();
    // this._cardItem = null;
  }

  _setEventListeners() {
    this._cardItem.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
    this._placeRemoveBtn = this._cardItem.querySelector(".places__remove-btn");
    if (
      this._name !== "Loading..." &&
      this._link !== "images/spinner_svg.dc4086388e55820fbae1.svg"
    ) {
      this._setEventListeners();
    }
    if (!this._isOwner) {
      this._placeRemoveBtn.remove();
    }
    if (this._likedByCurrUser) {
      this._placeLikeBtn.classList.add("places__like-btn__active");
    }

    this._placeImg.style.backgroundImage = `url(${this._link})`;
    this._placeImg.alt = `a photo of ${this._name}`;
    this._cardItem.querySelector(".places__name").textContent = `${this._name}`;
    this._cardItem.querySelector(".places__like-counter").textContent =
      this._likes.length;
    return this._cardItem;
  }
}
