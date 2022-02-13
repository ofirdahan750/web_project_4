import { Card } from "./Card.js";
import {formValidators} from './index.js'
//Profile global element
const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
//Place global element
export const placeGridContainer = document.querySelector(".places__grid-container");
//Popup all global elements popup section + close button
const popupBoxSections = document.querySelectorAll(".popup-box");
// const popupBoxCloseBtns = document.querySelectorAll(".popup-box__close-button");
// Popup edit global element

const formProfileEdit = document.querySelector(
  'form[name="form_profile-edit"]'
);
const nameInput = document.querySelector('input[name="name"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');

// popup add item to place global element

const placeTitle = document.querySelector('input[name="title_place"]');
const imgLink = document.querySelector('input[name="img_link"]');
const formAddPlace = document.querySelector('form[name="form_add-place"]');
const cardFormSubmitBtn = document.querySelector('button[name="btn_add-item"]');
// popup img item place global element

const popupBoxsObj = {
  popupAddItemSection: document.querySelector(".popup-box_type_add-item"),
  popupImgSection: document.querySelector(".popup-box_type_img"),
  popupProfileEditSection: document.querySelector(
    ".popup-box_type_profile-edit"
  ),
};
export const { popupAddItemSection, popupImgSection, popupProfileEditSection } =
  popupBoxsObj;

function handleEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}

function handleClosePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
  document.removeEventListener("keydown", closeByEscape);
}

function clearValueInput(...items) {
  items.forEach((item) => (item.value = ""));
}

function handleSubmitEditProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  clearValueInput(nameInput, aboutMeInput);
  handleClosePopup(popupProfileEditSection);
  formValidators['form_profile-edit'].resetValidation();
}

function handleSubmitAddItem(e) {
  e.preventDefault();
  const objNewItem = {
    name: placeTitle.value,
    link: imgLink.value,
  };
  const newItem = new Card(objNewItem);
  placeGridContainer.prepend(newItem.generateCard());
  clearValueInput(imgLink, placeTitle);
  cardFormSubmitBtn.disabled = true;
  cardFormSubmitBtn.classList.add("popup-box__submit-button_inactive");
  handleClosePopup(popupAddItemSection);
}
export function onInit() {
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
      const { target, which, currentTarget } = e;
      const { classList } = target;
      if (which === 3) return;
      if (classList.contains("popup-box_visible")) {
        handleClosePopup(target);
      }
      if (classList.contains("popup-box__close-button")) {
        handleClosePopup(currentTarget);
      }
    });
  });
}
function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup-box_visible");
    handleClosePopup(openedPopup);
  }
}
export function openPopup(popup) {
  popup.classList.add("popup-box_visible");
  document.addEventListener("keydown", closeByEscape);
}

