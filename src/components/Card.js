import { getRandomString } from "../utils/utils.js";
export class Card {
  constructor(
    { name, link, _id, owner },
    handleImageClick,
    openRemoveItemPopup,
    handleLikedToggle,
    getUserId,
    { likes, isOwner },
    cardSelector
  ) {
    this._name = name;
    this._link = link;
    this._handleImageClick = handleImageClick;
    this._getUserId = getUserId;
    this._openRemoveItemPopup = openRemoveItemPopup;
    this._cardSelector = cardSelector;
    this._likes = likes || [];
    this._isOwner = isOwner || false;
    this._id = _id || getRandomString();
    this._handleLikedToggle = handleLikedToggle;
    this._owner = owner;
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
    this._handleLikedToggle(this._isLiked, this, this._id);
  }

  _handleRemoveItem(e) {
    e.stopPropagation();
    this._openRemoveItemPopup(this._id, this._cardItem);
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
  _renderLikes = () => {
    this._placeLikeAmount.textContent = this._likes.length;
    this._isLiked
      ? this._placeLikeBtn.classList.add("places__like-btn__active")
      : this._placeLikeBtn.classList.remove("places__like-btn__active");
  };
  onUpdateLikes = (likes = [], isInit) => {
    if (!isInit && this._likes !== []) this._likes = likes;
    this._isLikedByCurrUser();
    this._renderLikes();
  };
  _isLikedByCurrUser = () => {
    const id = this._getUserId();
    this._isLiked = this._likes.find((like) => like._id === id) || false;
  };
  generateCard() {
    this._cardItem = this._getTemplate();
    this._placeImg = this._cardItem.querySelector(".places__img");
    this._placeLikeBtn = this._cardItem.querySelector(".places__like-btn");
    this._placeLikeAmount = this._cardItem.querySelector(
      ".places__like-counter"
    );
    this._placeRemoveBtn = this._cardItem.querySelector(".places__remove-btn");
    this.onUpdateLikes([], true);
    if (
      this._name !== "Loading..." &&
      this._link !== "images/spinner_svg.dc4086388e55820fbae1.svg"
    ) {
      this._setEventListeners();
    }
    if (!this._isOwner) {
      this._placeRemoveBtn.remove();
    }

    this._placeImg.style.backgroundImage = `url(${this._link})`;
    this._placeImg.alt = `a photo of ${this._name}`;
    this._cardItem.querySelector(".places__name").textContent = `${this._name}`;
    return this._cardItem;
  }
}
