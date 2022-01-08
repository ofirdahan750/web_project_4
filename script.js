const elBody = document.querySelector(".page");

const elProfileName = document.querySelector(".profile__name");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");

const elPopupBox = document.querySelector(".popup-box");
const elPopupBoxCloseBtn = document.querySelector(".popup-box__close-button");

const elPlaceGridContainer = document.querySelector(".place__grid-container");

const elSubmitForm = document.querySelector('form[name="popup-box_form"]');
const elInputName = document.querySelector('input[name="name"]');
const elInputAboutMe = document.querySelector('input[name="about_me"]');

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
  initialCards.forEach(item=>
    item.id= makeId()
    )
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
function onRemoveItem(itemId) {
  const idx = findIdx(itemId);
 initialCards.splice(idx,1)

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
    placeItemElement.querySelector(
      ".places__img"
    ).style.backgroundImage = `url(${item.link})`;
    placeItemElement.querySelector(
      ".places__img"
    ).alt = `a photo of ${item.name}`;
    placeItemElement.querySelector(
      ".places__name"
    ).textContent = `${item.name}`;
    const elBtnPlace = placeItemElement.querySelector(".places__like-btn");
    elBtnPlace.addEventListener("click", () => {
      onToggleLikedBtn(item.id);
    });
    placeItemElement.querySelector('.places__remove-btn').addEventListener("click",()=> {
      onRemoveItem(item.id)
    })
    item.isLiked
      ? elBtnPlace.classList.add("places__like-btn__active")
      : elBtnPlace.classList.remove("places__like-btn__active");
    return placeItemElement;
  });

  const elAllPlaceitem = document.querySelectorAll(".places__item");

  if (elAllPlaceitem.length) elPlaceGridContainer.textContent = "";

  elPlaceGridContainer.append(...htmlStr);

  // if (elAllPlaceitem.length) Array.from(elAllPlaceitem).forEach(item =>
  //   item.remove()
  //   )
  // elPlaceGridContainer.append(...htmlStr);
}

function onTogglePopUpopen(isInit) {
  if (!isInit) isPopUpOpen = !isPopUpOpen;
  if (!isPopUpOpen) {
    elPopupBox.classList.remove("popup-box_visible");
    elInputName.value = "";
    elInputAboutMe.value = "";
    elSubmitForm.removeEventListener("submit", onHandleProfileFormSubmit);
  } else {
    elPopupBox.classList.add("popup-box_visible");
    elInputName.value = elProfileName.textContent;
    elInputAboutMe.value = elAboutMe.textContent;
    elSubmitForm.addEventListener("submit", onHandleProfileFormSubmit);
  }
}

function onHandleProfileFormSubmit(evt) {
  evt.preventDefault();
  elProfileName.textContent = elInputName.value;
  elAboutMe.textContent = elInputAboutMe.value;
  onTogglePopUpopen();
}

elBody.addEventListener = addEventListener("load", () => {
  onInit();
});

elProfileEditBtn.addEventListener("click", () => {
  onTogglePopUpopen();
});

elPopupBoxCloseBtn.addEventListener("click", () => {
  onTogglePopUpopen();
});

// elSubmitForm.addEventListener("submit", onHandleProfileFormSubmit);
