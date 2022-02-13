import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { onInit, placeGridContainer } from "./utils.js";
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
export const formValidators  = {};
//Body global element
const body = document.querySelector(".page");

function renderPlaceItem() {
  const htmlStr = initialCards.map((card) => {
    const placeItemElement = new Card(card);
    return placeItemElement.generateCard();
  });

  placeGridContainer.append(...htmlStr);
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
  formItems.forEach((form) => {
    const newVaild = new FormValidator(settings, form);
    const formName = form.name
    formValidators[formName] = newVaild;
    newVaild.enableValidation();
  });
}
