const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];
const formValidators = {};

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

const nameInput = document.querySelector('input[name="name_input"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');

const cardFormSubmitBtn = document.querySelector('button[name="btn_add-item"]');
export {
  cardFormSubmitBtn,
  aboutMeInput,
  nameInput,
  initialCards,
  profileEditBtn,
  formValidators,
  profileAddBtn,
};
