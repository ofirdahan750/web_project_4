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
import {
  getRandomString,
  runFuncTimeOut,
  elementTextModifying,
} from "../utils/utils.js";

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

function handleSubmitAddItem(
  { title_place: name, img_link: link },
  btn,
  initialBtnTxt
) {
  addPopup.handleLoading(btn);
  api
    .addNewCard({
      name,
      link,
    })
    .then((res) => {
      addPopup.handleLoading(btn, "Place added successfully!");
      const cardInfo = {
        isOwner: true,
        likedByOwner: false,
        likes: [],
      };
      renderCard(res, cardInfo);
      runFuncTimeOut(() => {
        addPopup.close();
      }, 1000);
    })
    .catch((err) => {
      addPopup.handleLoading(btn, txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      runFuncTimeOut(() => {
        addPopup.handleLoading(btn, initialBtnTxt, true);
      }, 1800);
    });
}
function handleSubmitRemoveConfirm(id, element, btn, initialBtnTxt) {
  deleteConfirmPopup.handleLoading(btn);
  api
    .onRemoveItem(id)
    .then(() => {
      deleteConfirmPopup.handleLoading(btn, "Place removed successfully!");
      element.remove();
      runFuncTimeOut(() => {
        deleteConfirmPopup.close();
      }, 1000);
    })
    .catch((err) => {
      deleteConfirmPopup.handleLoading(btn, txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      runFuncTimeOut(() => {
        deleteConfirmPopup.handleLoading(btn, initialBtnTxt, true);
      }, 1050);
    });
}
function handleSubmitEditProfile({ name_input, about_me }, btn, initialBtnTxt) {
  formValidators["form_add-place"].resetValidation();
  editPopup.handleLoading(btn);

  api
    .setUserInfo({ name: name_input, about: about_me }, btn, initialBtnTxt)
    .then((res) => {
      editPopup.handleLoading(btn, "Profile edited successfully!");
      profileUser.setUserInfo(res);
      runFuncTimeOut(() => {
        editPopup.close();
      }, 1000);
    })
    .catch((err) => {
      editPopup.handleLoading(btn, txtErr);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      runFuncTimeOut(() => {
        editPopup.handleLoading(btn, initialBtnTxt);
      }, 1800);
    });
}
function handleSubmitProfilePic({ img_link }, btn, initialBtnTxt) {
  changeProfilePicPopup.handleLoading(btn);

  api
    .onUpdateProfilePic({ avatar: img_link })
    .then(() => {
      changeProfilePicPopup.handleLoading(
        btn,
        "Profile Picture modified successfully!"
      );
      profileUser.setPictureProfile(img_link);
      runFuncTimeOut(() => {
        changeProfilePicPopup.close();
      }, 1000);
    })
    .catch((err) => {
      changeProfilePicPopup.handleLoading(btn, txtErr);
      console.log(`Error: ${err}`);
    })

    .finally(() => {
      runFuncTimeOut(() => {
        changeProfilePicPopup.handleLoading(btn, initialBtnTxt, false);
      }, 1000);
    });
}
function handleLikedToggle(isLiked, item, id) {
  if (!isLiked) {
    api
      .addItemLike(id)
      .then((res) => {
        item.onUpdateLikesAmount(res.likes);
      })
      .catch((err) => console.log(`Error: ${err}`));
  } else {
    api
      .removeItemLike(id)
      .then((res) => {
        item.onUpdateLikesAmount(res.likes);
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
const editPopup = new PopupWithForm(
  ".popup-box_type_profile-edit",
  handleSubmitEditProfile,
  "Save"
);
const addPopup = new PopupWithForm(
  ".popup-box_type_add-item",
  handleSubmitAddItem,
  "Create"
);
const newImgPopup = new PopupWithImage({
  popupSelector: ".popup-box_type_img",
  imgSelector: ".popup-box__img",
  imgTitleSelector: ".popup-box__img-title",
});

const deleteConfirmPopup = new PopupConfirm({
  popupSelector: ".popup-box_type_confirm",
  handleSubmitRemoveConfirm,
  initialBtnTxt: "Yes",
});
const profileUser = new UserInfo({
  nameElm: ".profile__name",
  jobElm: ".profile__about-me",
  picElm: ".profile__avatar-cover",
});
const changeProfilePicPopup = new PopupWithForm(
  ".popup-box_type_change-profile-pic",
  handleSubmitProfilePic,
  "Save"
);
const api = new Api(apiConfing);
onInit();
