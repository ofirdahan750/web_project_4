const elBody = document.querySelector(".page");

const elRoot = document.querySelector(".root");

const elProfileName = document.querySelector(".profile__name");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");
const elProfileAddBtn = document.querySelector(".profile__add-btn");

const elPopupBox = document.querySelector(".popup-box");

const elPlaceGridContainer = document.querySelector(".place__grid-container");

let isPopUpOpen = false;

function makeId() {
  let text = "";
  const possibleLetters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const possibleNumbers = "0123456789";

  for (var i = 0; i < 2; i++)
    text += possibleLetters.charAt(
      Math.floor(Math.random() * possibleLetters.length)
    );
  for (var i = 0; i < 3; i++)
    text += possibleNumbers.charAt(
      Math.floor(Math.random() * possibleNumbers.length)
    );

  return text;
}
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    isLiked: false,
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    isLiked: false,
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    isLiked: false,
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    isLiked: false,
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    isLiked: false,
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    isLiked: false,
  },
];

function onInit() {
  isPopUpOpen = false;
  initialCards.forEach((item) => (item.id = makeId()));
  renderPlaceItem();
  onTogglePopUpopen(true);
}
function findIdx(itemId) {
  const idx = initialCards.findIndex((card) => card.id === itemId);
  return idx;
}
function onToggleLikedBtn(itemId) {
  const idx = findIdx(itemId);
  initialCards[idx].isLiked = !initialCards[idx].isLiked;
  renderPlaceItem();
}
function onRemoveItem(e, itemId) {
  e.stopPropagation();
  const idx = findIdx(itemId);
  initialCards.splice(idx, 1);

  renderPlaceItem();
}

function renderPlaceItem() {
  const placeItemTemplate = document.querySelector(
    "#places-item-template"
  ).content;
  const htmlStr = initialCards.map((item) => {
    const placeItemElement = placeItemTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    const elPlaceImg = placeItemElement.querySelector(".places__img");
    elPlaceImg.style.backgroundImage = `url(${item.link})`;
    elPlaceImg.alt = `a photo of ${item.name}`;
    elPlaceImg.addEventListener("click", () => {
      onTogglePopUpopen(false, "img-item", item);
    });
    placeItemElement.querySelector(
      ".places__name"
    ).textContent = `${item.name}`;
    const elBtnPlace = placeItemElement.querySelector(".places__like-btn");
    elBtnPlace.addEventListener("click", () => {
      onToggleLikedBtn(item.id);
    });
    placeItemElement
      .querySelector(".places__remove-btn")
      .addEventListener("click", (e) => {
        onRemoveItem(e, item.id);
      });
    item.isLiked
      ? elBtnPlace.classList.add("places__like-btn__active")
      : elBtnPlace.classList.remove("places__like-btn__active");
    return placeItemElement;
  });
  const elAllPlaceitem = document.querySelectorAll(".places__item");
  if (elAllPlaceitem.length) elPlaceGridContainer.textContent = "";
  elPlaceGridContainer.append(...htmlStr);
}

function onCreateItem(elemTarget, elemType, elemClass) {
  const newElme = document.createElement(elemType);
  newElme.classList.add(elemClass);
  elemTarget.append(newElme);
  return newElme;
}

function onTogglePopUpopen(isInit, popupType = "", item = {}) {
  if (!isInit) isPopUpOpen = !isPopUpOpen;
  const popupTemplate = document.querySelector("#popup-template").content;
  const popupElement = popupTemplate
    .querySelector(".popup-box__container")
    .cloneNode(true);
  const elPopupBoxCloseBtn = popupElement.querySelector(
    ".popup-box__close-button"
  );
  const elPopupWrapper = popupElement.querySelector(".popup-box__wrapper");
  const elPopupHeading = popupElement.querySelector(".popup-box__heading");
  const elFirstInput = popupElement.querySelector('input[name="first-input"]');
  const elSecInput = popupElement.querySelector('input[name="second-input"]');
  const elPopupForm = popupElement.querySelector('form[name="popup-box_form"]');
  const elPopupFormBtn = popupElement.querySelector(
    ".popup-box__submit-button"
  );
  if (!isPopUpOpen) {
    elPopupBox.classList.remove("popup-box_visible");
    if (!isInit) document.querySelector(".popup-box__container").remove();
  } else {
    switch (popupType) {
      case "edit_profile":
        elPopupHeading.textContent = "Edit profile";
        elFirstInput.value = elProfileName.textContent;
        elSecInput.value = elAboutMe.textContent;
        elPopupFormBtn.textContent = "Save";
        elPopupForm.addEventListener("submit", (e) => {
          onSubmitEditProfile(e, elFirstInput.value, elSecInput.value);
        });
        break;
      case "add-item":
        elPopupHeading.textContent = "New place";
        elFirstInput.placeholder = "Title";
        elSecInput.placeholder = "Image link";
        elPopupFormBtn.textContent = "Create";
        elPopupForm.addEventListener("submit", (e) => {
          onSubmitAddItem(e, elFirstInput.value, elSecInput.value);
        });
        break;
      case "img-item":
        popupElement.classList.add("popup-box__container_type_img");
        elPopupWrapper.classList.add("popup-box__wrapper_type_img");
        elPopupWrapper.textContent = "";
        const imgElem = onCreateItem(elPopupWrapper, "img", "popup-box__img");
        imgElem.src = item.link;
        const textElem = onCreateItem(
          elPopupWrapper,
          "p",
          "popup-box__img-title"
        );
        textElem.textContent = item.name;
        break;
      default:
        return;
    }
    elPopupBox.classList.add("popup-box_visible");
    elPopupBox.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      console.log("e.which:", e.which);
      if (
        e.target.classList.contains(`popup-box` && "popup-box_visible") &&
        e.which !== 3
      ) {
        onTogglePopUpopen();
      }
    });
    elPopupBoxCloseBtn.addEventListener("click", () => {
      onTogglePopUpopen();
    });
    elPopupBox.append(popupElement);
  }
}

function onSubmitEditProfile(evt, profileNameVal, profileAboutMeVal) {
  evt.preventDefault();
  elProfileName.textContent = profileNameVal;
  elAboutMe.textContent = profileAboutMeVal;
  onTogglePopUpopen();
}
function onSubmitAddItem(evt, itemName, itemSrc) {
  evt.preventDefault();
  const newItem = {
    id: makeId(),
    name: itemName,
    link: itemSrc,
    isLike: false,
  };
  initialCards.push(newItem);
  onTogglePopUpopen();
  renderPlaceItem();
}

elBody.addEventListener = addEventListener("load", () => {
  onInit();
});

elProfileEditBtn.addEventListener("click", () => {
  onTogglePopUpopen(false, "edit_profile");
});
elProfileAddBtn.addEventListener("click", () => {
  onTogglePopUpopen(false, "add-item");
});
