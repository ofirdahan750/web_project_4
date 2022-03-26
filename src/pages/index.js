import "./index.css";
import { apiConfing } from "../../confing.js";
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
  openChangeProfilePopupBtn,
  openEditUserPopupBtn,
  openAddPlacesPopupBtn,
  formValidators,
  txtErr,
} from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfirm";

const nameInput = document.querySelector('input[name="name_input"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');

const initialBtnTxt = {
  editPopup: "Save",
  addPopup: "Create",
  deleteConfirmPopup: "Yes",
  changeProfilePicPopup: "Save",
};

function createPlaceItem(item, cardInfo) {
  const newCard = new Card(
    item,
    openImgPopup,
    openRemoveItemPopup,
    handleLikedToggle,
    getUserId,
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
    const validator = new FormValidator(settings, form);
    const formName = form.name;
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
function fillProfileForm({ nameInfo, aboutMeInfo }) {
  nameInput.value = nameInfo;
  aboutMeInput.value = aboutMeInfo;
}
function openChangeProfilePopup() {
  formValidators["form_change-profile-pic"].resetValidation();
  changeProfilePicPopup.open();
}
function openAddProfilePopup() {
  formValidators["form_add-place"].resetValidation();
  addPopup.open();
}
function openEditProfilePopup() {
  formValidators["form_profile-edit"].resetValidation();
  editPopup.open();
  fillProfileForm(profileUser.getUserInfo());
}
function openImgPopup(title, link) {
  newImgPopup.open(title, link);
}
function openRemoveItemPopup(id, cardItem) {
  deleteConfirmPopup.open(id, cardItem);
}
function getUserId() {
  return profileUser.getUserId();
}

function handleSubmitAddItem({ title_place: name, img_link: link }) {
  addPopup.handleLoading();
  api
    .addNewCard({
      name,
      link,
    })
    .then((res) => {
      addPopup.handleLoading("Place added successfully!");
      const cardInfo = {
        isOwner: true,
        likes: [],
      };
      renderCard(res, cardInfo);
      setTimeout(() => {
        addPopup.close();
      }, 1000);
    })
    .catch((err) => {
      addPopup.handleLoading(txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {
        addPopup.handleLoading(initialBtnTxt.addPopup, true);
      }, 1800);
    });
}
function handleSubmitRemoveConfirm(id, item) {
  deleteConfirmPopup.handleLoading();
  api
    .onRemoveItem(id)
    .then(() => {
      deleteConfirmPopup.handleLoading("Place removed successfully!");
      item.remove();
      setTimeout(() => {
        deleteConfirmPopup.close();
      }, 1000);
    })
    .catch((err) => {
      deleteConfirmPopup.handleLoading(txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {
        deleteConfirmPopup.handleLoading(
          initialBtnTxt.deleteConfirmPopup,
          true
        );
      }, 1050);
    });
}
function handleSubmitEditProfile({ name_input, about_me }) {
  formValidators["form_add-place"].resetValidation();
  editPopup.handleLoading();

  api
    .setUserInfo({ name: name_input, about: about_me })
    .then((res) => {
      editPopup.handleLoading("Profile edited successfully!");
      profileUser.setUserInfo(res);
      setTimeout(() => {
        editPopup.close();
      }, 1000);
    })
    .catch((err) => {
      editPopup.handleLoading(txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {
        editPopup.handleLoading(initialBtnTxt.editPopup, true);
      }, 1800);
    });
}
function handleSubmitProfilePic({ img_link }) {
  changeProfilePicPopup.handleLoading();

  api
    .onUpdateProfilePic({ avatar: img_link })
    .then(() => {
      changeProfilePicPopup.handleLoading(
        btn,
        "Profile Picture modified successfully!"
      );
      profileUser.setPictureProfile(img_link);
      setTimeout(() => {
        changeProfilePicPopup.close();
      }, 1000);
    })
    .catch((err) => {
      changeProfilePicPopup.handleLoading(txtErr);
      console.log(`Error: ${err}`);
    })

    .finally(() => {
      setTimeout(() => {
        changeProfilePicPopup.handleLoading(
          initialBtnTxt.changeProfilePicPopup,
          true
        );
      }, 1000);
    });
}
function handleLikedToggle(isLiked, item, id) {
  if (!isLiked) {
    api
      .addItemLike(id)
      .then((res) => {
        item.onUpdateLikes(res.likes);
      })
      .catch((err) => console.log(`Error: ${err}`));
  } else {
    api
      .removeItemLike(id)
      .then((res) => {
        item.onUpdateLikes(res.likes);
      })
      .catch((err) => console.log(`Error: ${err}`));
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
    .catch((err) => console.log(`Error: ${err}`));
}

function setPopupEvent() {
  editPopup.setEventListeners();
  addPopup.setEventListeners();
  newImgPopup.setEventListeners();
  deleteConfirmPopup.setEventListeners();
  changeProfilePicPopup.setEventListeners();
}
function renderCard(item, cardInfo) {
  cardsList.addItem(createPlaceItem(item, cardInfo));
}

const cardsList = new Section({
  renderer: (data) => {
    const { owner, likes } = data;
    const id = getUserId();
    const cardInfo = {
      isOwner: owner._id === id,
      likes,
    };
    renderCard(data, cardInfo);
  },
  containerSelector: ".places__grid-container",
});
const editPopup = new PopupWithForm(
  ".popup-box_type_profile-edit",
  handleSubmitEditProfile,
  "Save"
);

const addPopup = new PopupWithForm(
  ".popup-box_type_add-item",
  handleSubmitAddItem
);
const newImgPopup = new PopupWithImage({
  popupSelector: ".popup-box_type_img",
  imgSelector: ".popup-box__img",
  imgTitleSelector: ".popup-box__img-title",
});

const deleteConfirmPopup = new PopupConfirm({
  popupSelector: ".popup-box_type_confirm",
  handleSubmitRemoveConfirm,
});
const profileUser = new UserInfo({
  nameElm: ".profile__name",
  jobElm: ".profile__about-me",
  picElm: ".profile__avatar-cover",
});
const changeProfilePicPopup = new PopupWithForm(
  ".popup-box_type_change-profile-pic",
  handleSubmitProfilePic
);
const api = new Api(apiConfing);
onInit();
