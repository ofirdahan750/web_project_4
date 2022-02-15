//Please look at the line 62 again
//Slack thread about : https://yandex-students.slack.com/archives/C030P7RSYJE/p1644842269510179
import { openPopup } from "./utils.js";
import { elementDom } from "./index.js";

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
  _handleToggleLikedBtn(e, placeBtn) {
    e.stopPropagation();
    placeBtn.classList.toggle("places__like-btn__active");
  }
  _handleRemoveItem(e, cardItem) {
    e.stopPropagation();
    cardItem.remove();
  }
  _handleImgPopup(item) {
    popupImg.src = item._link;
    popupImg.alt = `a pictrue of ${item._name}`;
    popupImgTitle.textContent = item._name;
  }
  _setEventListeners(cardItem, placeImg, placeBtn) {
    placeImg.addEventListener("click", () => {
      this._handleImgPopup(this);
      openPopup(elementDom.popupImgSection);
    });
    placeImg.addEventListener("click", () => {
      openPopup(elementDom.popupImgSection);
    });
    cardItem
      .querySelector(".places__like-btn")
      .addEventListener("click", (e) => {
        this._handleToggleLikedBtn(e, placeBtn);
      });
    cardItem
      .querySelector(".places__remove-btn")
      .addEventListener("click", (e) => {
        this._handleRemoveItem(e, cardItem);
      });
  }

  generateCard() {
    const cardItem = this._getTemplate();
    const placeImg = cardItem.querySelector(".places__img");
    const placeBtn = cardItem.querySelector(".places__like-btn");
    this._setEventListeners(cardItem, placeImg, placeBtn);
    placeImg.style.backgroundImage = `url(${this._link})`; //This line is refers to the Place item img and not the popup!The function that's changes the popup is _handleImgPopup()
    placeImg.alt = `a photo of ${this._name}`;
    cardItem.querySelector(".places__name").textContent = `${this._name}`;
    return cardItem;
  }
}
