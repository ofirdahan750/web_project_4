import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { onInit, clearValueInput, handleClosePopup } from "./utils.js";
import { initialCards } from "../data/initialCards.js";

const formValidators = {};

const body = document.querySelector(".page");

const elementDom = {
  popupProfileEditSection: document.querySelector(
    ".popup-box_type_profile-edit"
  ),
  profileName: document.querySelector(".profile__name"),
  aboutMe: document.querySelector(".profile__about-me"),
  profileEditBtn: document.querySelector(".profile__edit-btn"),
  profileAddBtn: document.querySelector(".profile__add-btn"),
  placeGridContainer: document.querySelector(".places__grid-container"),
  popupBoxSections: document.querySelectorAll(".popup-box"),
  formProfileEdit: document.querySelector('form[name="form_profile-edit"]'),
  nameInput: document.querySelector('input[name="name-input"]'),
  aboutMeInput: document.querySelector('input[name="about_me"]'),
  placeTitle: document.querySelector('input[name="title_place"]'),
  imgLink: document.querySelector('input[name="img_link"]'),
  formAddPlace: document.querySelector('form[name="form_add-place"]'),
  cardFormSubmitBtn: document.querySelector('button[name="btn_add-item"]'),
  popupAddItemSection: document.querySelector(".popup-box_type_add-item"),
  popupImgSection: document.querySelector(".popup-box_type_img"),
};

function renderPlaceItem() {
  const htmlStr = initialCards.map((card) => {
    const placeItemElement = new Card(card, "#places-item-template");
    return placeItemElement.generateCard();
  });

  elementDom.placeGridContainer.append(...htmlStr);
}

body.addEventListener = addEventListener("load", () => {
  renderPlaceItem();
  onInit();
  enableValidation({
    formSelector: ".popup-box__form",
    inputSelector: ".popup-box__input",
    submitButtonSelector: ".popup-box__submit-button",
    inactiveButtonClass: "popup-box__submit-button_inactive",
    inputErrorClass: ".popup-box__input_type_error",
    errorClass: ".popup-box__input-error_active",
  });
});

function enableValidation(settings) {
  const formItems = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  formItems.map((form) => {
    const newVaild = new FormValidator(settings, form);
    const formName = form.name;
    formValidators[formName] = newVaild;
    newVaild.enableValidation();
  });
}
function handleSubmitAddItem(e) {
  e.preventDefault();
  const {
    placeGridContainer,
    cardFormSubmitBtn,
    popupAddItemSection,
    placeTitle,
    imgLink,
  } = elementDom;
  const objNewItem = {
    name: placeTitle.value,
    link: imgLink.value,
  };
  const newItem = new Card(objNewItem, "#places-item-template");
  placeGridContainer.prepend(newItem.generateCard());
  clearValueInput(imgLink, placeTitle);
  cardFormSubmitBtn.disabled = true;
  cardFormSubmitBtn.classList.add("popup-box__submit-button_inactive");
  handleClosePopup(popupAddItemSection);
  formValidators["form_add-place"].resetValidation();
}
function handleEditProfilePopup() {
  const { nameInput, aboutMeInput, aboutMe, profileName } = elementDom;
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}
function handleSubmitEditProfile(e) {
  e.preventDefault();
  const {
    nameInput,
    aboutMeInput,
    aboutMe,
    profileName,
    popupProfileEditSection,
  } = elementDom;
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  clearValueInput(nameInput, aboutMeInput);
  handleClosePopup(popupProfileEditSection);
  formValidators["form_profile-edit"].resetValidation();
}

export {
  elementDom,
  formValidators,
  handleSubmitAddItem,
  handleEditProfilePopup,
  handleSubmitEditProfile,
};
