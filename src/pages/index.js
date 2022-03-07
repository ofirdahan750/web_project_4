import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardFormSubmitBtn,
  aboutMeInput,
  nameInput,
  initialCards,
  profileEditBtn,
  profileAddBtn,
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
  newAddProfilePopup.open();
}
function handleSubmitAddItem({ title_place: name, img_link: link }) {
  cardsList.addItem(createPlaceItem({ name, link }));
}
function handleSubmitEditProfile({ name_input, about_me }) {
  formValidators["form_add-place"].resetValidation();
  profileUser.setUserInfo(name_input, about_me);
}
function openEditProfilePopup() {
  formValidators["form_profile-edit"].resetValidation();
  newEditProfilePopup.open();
  const infoUser = profileUser.getUserInfo();
  const { nameInfo, aboutMeInfo } = infoUser;
  nameInput.value = nameInfo;
  aboutMeInput.value = aboutMeInfo;
}
function openImgPopup(title, link) {
  newImgPopup.open(title, link);
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
const newEditProfilePopup = new PopupWithForm(
  ".popup-box_type_profile-edit",
  handleSubmitEditProfile
);
const newAddProfilePopup = new PopupWithForm(
  ".popup-box_type_add-item",
  handleSubmitAddItem
);
const newImgPopup = new PopupWithImage({
  popupElm: ".popup-box_type_img",
  imgElm: ".popup-box__img",
  imgTitleElm: ".popup-box__img-title",
});
const profileUser = new UserInfo({
  nameElm: ".profile__name",
  jobElm: ".profile__about-me",
});
function onInit() {
  cardsList.renderItems();
  profileEditBtn.addEventListener("click", openEditProfilePopup);
  profileAddBtn.addEventListener("click", openAddProfilePopup);
  enableValidation({
    formSelector: ".popup-box__form",
    inputSelector: ".popup-box__input",
    submitButtonSelector: ".popup-box__submit-button",
    inactiveButtonClass: "popup-box__submit-button_inactive",
    inputErrorClass: ".popup-box__input_type_error",
    errorClass: ".popup-box__input-error_active",
  });
}
onInit();
