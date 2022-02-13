import { openPopup,popupImgSection} from "./utils.js";


const popupImg = document.querySelector(".popup-box__img");
const popupImgTitle = document.querySelector(".popup-box__img-title");

export class Card {
    constructor(data, cardSelector = "#places-item-template") {
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
        e.target.classList.toggle("places__like-btn__active");
      }
      _onRemoveItem(e) {
        e.stopPropagation();
        const itemToRemove = e.currentTarget.closest('.places__item');
        itemToRemove.remove();
      }
      _handleImgPopup(item) {
        popupImg.src = item._link;
        popupImg.alt = `a pictrue of ${item._name}`;
        popupImgTitle.textContent = item._name;
      }
      _setEventListeners(cardItem, placeImg) {
        placeImg.addEventListener("click", () => {
            this._handleImgPopup(this);
            openPopup(popupImgSection);
          });
        cardItem
        .querySelector(".places__like-btn")
        .addEventListener("click", (e) => {
          this._handleToggleLikedBtn(e);
        });
        cardItem
        .querySelector(".places__remove-btn")
        .addEventListener("click", (e) => {
          this._onRemoveItem(e);
        });
      }

      generateCard() {
        const cardItem = this._getTemplate();
        const placeImg = cardItem.querySelector(".places__img");
        this._setEventListeners(cardItem, placeImg);
        placeImg.style.backgroundImage = `url(${this._link})`;
        placeImg.alt = `a photo of ${this._name}`;
        cardItem.querySelector(".places__name").textContent = `${this._name}`;
        return cardItem;
      }
    }