import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  aboutMeInput,
  nameInput,
  initialCards,
  openEditUserPopupBtn,
  openAddPlacesPopupBtn,
  formValidators,
} from "../utils/constants.js";
function createPlaceItem(item) {
  const newCard = new Card(item, openImgPopup, "#places-item-template");
  return newCard.generateCard();
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

function openAddProfilePopup() {
  formValidators["form_add-place"].resetValidation();
  AddPopup.open();
}
function openEditProfilePopup() {
  formValidators["form_profile-edit"].resetValidation();
  EditPopup.open();
  const { nameInfo, aboutMeInfo } = profileUser.getUserInfo();
  nameInput.value = nameInfo;
  aboutMeInput.value = aboutMeInfo;
}
function openImgPopup(title, link) {
  newImgPopup.open(title, link);
}
function handleSubmitAddItem({ title_place: name, img_link: link }) {
  cardsList.addItem(createPlaceItem({ name, link }));
}
function handleSubmitEditProfile({ name_input, about_me }) {
  formValidators["form_add-place"].resetValidation();
  profileUser.setUserInfo(name_input, about_me);
}

function onInit() {
  cardsList.renderItems();
  openEditUserPopupBtn.addEventListener("click", openEditProfilePopup);
  openAddPlacesPopupBtn.addEventListener("click", openAddProfilePopup);
  enableValidation({
    formSelector: ".popup-box__form",
    inputSelector: ".popup-box__input",
    submitButtonSelector: ".popup-box__submit-button",
    inactiveButtonClass: "popup-box__submit-button_inactive",
    inputErrorClass: ".popup-box__input_type_error",
    errorClass: ".popup-box__input-error_active",
  });
  setPopupEvent();
}
function setPopupEvent() {
  EditPopup.setEventListeners();
  AddPopup.setEventListeners();
  newImgPopup.setEventListeners();
}
function renderCard(item) {
  cardsList.addItem(createPlaceItem(item));
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".places__grid-container"
);
const EditPopup = new PopupWithForm(
  ".popup-box_type_profile-edit",
  handleSubmitEditProfile
);
const AddPopup = new PopupWithForm(
  ".popup-box_type_add-item",
  handleSubmitAddItem
);
const newImgPopup = new PopupWithImage({
  popupSelector: ".popup-box_type_img",
  imgSelector: ".popup-box__img",
  imgTitleSelector: ".popup-box__img-title",
});
const profileUser = new UserInfo({
  nameElm: ".profile__name",
  jobElm: ".profile__about-me",
});
onInit();
