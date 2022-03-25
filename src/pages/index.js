import "./index.css";
import { apiConfing } from "../../config.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";
import spinnerGif from "../images/profile/spinner_svg.svg";
import { getRandomString } from "../utils/utils.js";

import {
  aboutMeInput,
  nameInput,
  openChangeProfilePopupBtn,
  openEditUserPopupBtn,
  openAddPlacesPopupBtn,
  formValidators,
} from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfirm";
function createPlaceItem(item, cardInfo) {
  const newCard = new Card(
    item,
    openImgPopup,
    openRemoveItemPopup,
    handleLikedToggle,
    cardInfo,
    "#places-item-template"
  );
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

function openChangeProfilePopup() {
  formValidators["form_change-profile-pic"].resetValidation();
  ChangeProfilePic.open();
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
  NewImgPopup.open(title, link);
}
function openRemoveItemPopup(id, cardItem) {
  DeleteConfirmPopup.open(id, cardItem);
}
function handleSubmitAddItem({ title_place: name, img_link: link }, btn) {
  btn.textContent = "Saving...";
  api
    .addNewCard({
      name,
      link,
    })
    .then((res) => {
      const cardInfo = {
        isOwner: true,
        likedByOwner: false,
        likes: [],
      };
      renderCard(res, cardInfo);
    })
    .catch((err) => console.log("err: " + err));
}
function handleSubmitRemoveConfirm(id, element) {
  api
    .onRemoveItem(id)
    .then(() => {
      element.remove();
    })
    .catch((err) => console.log("err: " + err));
}
function handleSubmitEditProfile({ name_input, about_me }, btn) {
  formValidators["form_add-place"].resetValidation();
  btn.textContent = "Saving...";

  api
    .setUserInfo({ name: name_input, about: about_me })
    .then((res) => {
      profileUser.setUserInfo(res);
    })
    .catch((err) => console.log("err: " + err));
}
function handleSubmitProfilePic({ img_link }, btn) {
  btn.textContent = "Saving...";
  api
    .onUpdateProfilePic({ avatar: img_link })
    .then(() => {
      profileUser.setPictureProfile(img_link);
    })
    .catch((err) => console.log("err: " + err));
}
function handleLikedToggle(isLiked, item, id) {
  if (isLiked) {
    api
      .addItemLike(id)
      .then((res) => {
        item.onUpdateLikesAmount(res.likes);
      })
      .catch((err) => console.log("err: " + err));
  } else {
    api
      .removeItemLike(id)
      .then((res) => {
        item.onUpdateLikesAmount(res.likes);
      })
      .catch((err) => console.log("err: " + err));
  }
}
function setLoadingInit(status, cardItemsArr, userInfo) {
  if (status) {
    profileUser.setUserInfo({
      name: "Loading...",
      about: "Loading...",
      _id: getRandomString(),
    });
    profileUser.setPictureProfile(spinnerGif);
    cardsList.setNewItemlist([
      {
        name: "Loading...",
        link: spinnerGif,
        owner: { _id: getRandomString() },
        likes: [],
      },
    ]);
  } else {
    document.querySelector(".places__grid-container").innerHTML = "";
    profileUser.setUserInfo({
      name: userInfo.name,
      about: userInfo.about,
      _id: userInfo._id,
    });
    profileUser.setPictureProfile(userInfo.avatar);
    cardsList.setNewItemlist(cardItemsArr);
    openEditUserPopupBtn.addEventListener("click", openEditProfilePopup);
    openAddPlacesPopupBtn.addEventListener("click", openAddProfilePopup);
    openChangeProfilePopupBtn.addEventListener("click", openChangeProfilePopup);
  }
}
function onInit() {
  setLoadingInit(true);
  api
    .getInitInfo()
    .then(([cardItemsArr, userInfo]) => {
      setLoadingInit(false, cardItemsArr, userInfo);
      enableValidation({
        formSelector: ".popup-box__form",
        inputSelector: ".popup-box__input",
        submitButtonSelector: ".popup-box__submit-button",
        inactiveButtonClass: "popup-box__submit-button_inactive",
        inputErrorClass: ".popup-box__input_type_error",
        errorClass: ".popup-box__input-error_active",
      });
      setPopupEvent();
    })

    .catch((err) => {
      console.log(err);
    });
}

function setPopupEvent() {
  EditPopup.setEventListeners();
  AddPopup.setEventListeners();
  NewImgPopup.setEventListeners();
  DeleteConfirmPopup.setEventListeners();
  ChangeProfilePic.setEventListeners();
}
function renderCard(item, cardInfo) {
  cardsList.addItem(createPlaceItem(item, cardInfo));
}

const cardsList = new Section({
  renderer: (data) => {
    const { owner, likes } = data;
    const id = profileUser.getUserId();
    const cardInfo = {
      isOwner: owner._id === id,
      likedByCurrUser: likes.find((user) => user._id === id),
      likes,
    };
    renderCard(data, cardInfo);
  },
  containerSelector: ".places__grid-container",
});
const EditPopup = new PopupWithForm(
  ".popup-box_type_profile-edit",
  handleSubmitEditProfile,
  "Save"
);
const AddPopup = new PopupWithForm(
  ".popup-box_type_add-item",
  handleSubmitAddItem,
  "Create"
);
const NewImgPopup = new PopupWithImage({
  popupSelector: ".popup-box_type_img",
  imgSelector: ".popup-box__img",
  imgTitleSelector: ".popup-box__img-title",
});

const DeleteConfirmPopup = new PopupConfirm({
  popupSelector: ".popup-box_type_confirm",
  handleSubmitRemoveConfirm,
});
const profileUser = new UserInfo({
  nameElm: ".profile__name",
  jobElm: ".profile__about-me",
  picElm: ".profile__avatar-cover",
});
const ChangeProfilePic = new PopupWithForm(
  ".popup-box_type_change-profile-pic",
  handleSubmitProfilePic,
  "Save"
);
const api = new Api(apiConfing);
onInit();
