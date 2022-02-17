import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

import { initialCards } from "../data/initialCards.js";
import { handleClosePopup, openPopup } from "./utils.js";
const formValidators = {};

const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

const placeGridContainer = document.querySelector(".places__grid-container");

const popupBoxSections = document.querySelectorAll(".popup-box");
const popupProfileEditSection = document.querySelector(
  ".popup-box_type_profile-edit"
);
const popupAddItemSection = document.querySelector(".popup-box_type_add-item");
const formAddPlace = popupAddItemSection.querySelector(
  'form[name="form_add-place"]'
);
const formProfileEdit = popupProfileEditSection.querySelector(
  'form[name="form_profile-edit"]'
);

const nameInput = document.querySelector('input[name="name-input"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');
const placeTitle = document.querySelector('input[name="title_place"]');
const imgLink = document.querySelector('input[name="img_link"]');
const cardFormSubmitBtn = document.querySelector('button[name="btn_add-item"]');

function renderPlaceItem() {
  const htmlStr = initialCards.map((card) => {
    const placeItemElement = new Card(card, "#places-item-template");
    return placeItemElement.generateCard();
  });

  placeGridContainer.append(...htmlStr);
}

function enableValidation(settings) {
  const formItems = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formItems.forEach((form) => {
    const newVaild = new FormValidator(settings, form);
    const formName = form.name;
    formValidators[formName] = newVaild;
    newVaild.enableValidation();
  });
}
function handleSubmitAddItem(e) {
  e.preventDefault();

  const objNewItem = {
    name: placeTitle.value,
    link: imgLink.value,
  };
  const newItem = new Card(objNewItem, "#places-item-template");
  placeGridContainer.prepend(newItem.generateCard());
  handleClosePopup(popupAddItemSection);
  formValidators["form_add-place"].resetValidation();
}

function handleEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}
function handleSubmitEditProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  handleClosePopup(popupProfileEditSection);
  formValidators["form_profile-edit"].resetValidation();
}

export {
  formValidators,
  profileEditBtn,
  cardFormSubmitBtn,
  handleSubmitAddItem,
  handleEditProfilePopup,
  handleSubmitEditProfile,
};
onInit();

function onInit() {
  renderPlaceItem();
  profileEditBtn.addEventListener("click", () => {
    openPopup(popupProfileEditSection);
    handleEditProfilePopup();
  });
  profileAddBtn.addEventListener("click", () => {
    openPopup(popupAddItemSection);
  });
  formProfileEdit.addEventListener("submit", (e) => {
    handleSubmitEditProfile(e);
  });
  formAddPlace.addEventListener("submit", (e) => {
    handleSubmitAddItem(e);
  });
  popupBoxSections.forEach((popup) => {
    popup.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const { target, currentTarget } = e;
      const { classList } = target;
      if (classList.contains("popup-box__wrapper") || e.button === 2) return;
      if (target.closest(".popup-box_visible")) {
        handleClosePopup(target);
      }
      if (target.closest(".popup-box__close-button")) {
        handleClosePopup(currentTarget);
      }
    });
    popup.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });
  enableValidation({
    formSelector: ".popup-box__form",
    inputSelector: ".popup-box__input",
    submitButtonSelector: ".popup-box__submit-button",
    inactiveButtonClass: "popup-box__submit-button_inactive",
    inputErrorClass: ".popup-box__input_type_error",
    errorClass: ".popup-box__input-error_active",
  });
}
