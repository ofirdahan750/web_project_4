const elBody = document.querySelector(".page");

const elRoot = document.querySelector(".root");

const elProfileName = document.querySelector(".profile__name");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");
const elProfileAddBtn = document.querySelector(".profile__add-btn");

const elPlaceGridContainer = document.querySelector(".places__grid-container");

const elPopupBoxSection = document.querySelectorAll(".popup-box");
const elPopupBoxCloseBtn = document.querySelectorAll(
  ".popup-box__close-button"
);
const elNameInput = document.querySelector('input[name="name"]');
const elAboutMeInput = document.querySelector('input[name="about_me"]');
const elFormProfileEdit = document.querySelector(
  'form[name="form_profile-edit"]'
);

const elPlaceTitle = document.querySelector('input[name="title_place"]');
const elImgLink = document.querySelector('input[name="img_link"]');
const elFormAddPlace = document.querySelector('form[name="form_add-place"]');
let isPopUpOpen = true;

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
  initialCards.forEach((item) => (item.id = makeId()));
  renderPlaceItem();
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
      onTogglePopUpopen("img", item);
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

function onTogglePopUpopen(popupType = "", item = {}) {
  isPopUpOpen = !isPopUpOpen;
  const elPopupBox = document.querySelector(
    `.popup-box.popup-box_type_${popupType}`
  );
  if (!isPopUpOpen) {
    elPopupBox.classList.add("popup-box_visible");
    switch (popupType) {
      case "profile-edit":
        elNameInput.value = elProfileName.textContent;
        elAboutMeInput.value = elAboutMe.textContent;
        break;
      case "add-item":
        elFormAddPlace.addEventListener("submit", (e) => {
          onSubmitAddItem(e);
        });
        break;
      case "img":
        elPopupBox.querySelector(".popup-box__img").src = item.link;
        elPopupBox.querySelector(".popup-box__img").alt = `a pictrue of ${item.link}`;
        elPopupBox.querySelector(".popup-box__img-title").textContent =
          item.name;
        break;
      default:
        return;
    }
  } else {
    elPopupBox.classList.remove("popup-box_visible");
    const elPopupboxContainer = elPopupBox.querySelector(
      ".popup-box__container"
    );
    elPopupboxContainer.classList.add("popup-box__container_display_none");
    setTimeout(() => {
      elPopupboxContainer.classList.remove("popup-box__container_display_none");
    }, 320);
  }
}

function onSubmitEditProfile(evt) {
  evt.preventDefault();
  elProfileName.textContent = elNameInput.value;
  elAboutMe.textContent = elAboutMeInput.value;
  elNameInput.value = "";
  elAboutMeInput.value = "";
  onTogglePopUpopen("profile-edit");
}

function onSubmitAddItem(evt) {
  evt.preventDefault();
  const newItem = {
    id: makeId(),
    name: elPlaceTitle.value,
    link: elImgLink.value,
    isLike: false,
  };
  initialCards.push(newItem);
  onTogglePopUpopen("add-item");
  renderPlaceItem();
}

elBody.addEventListener = addEventListener("load", () => {
  onInit();
  elProfileEditBtn.addEventListener("click", () => {
    onTogglePopUpopen("profile-edit");
  });
  elProfileAddBtn.addEventListener("click", () => {
    onTogglePopUpopen("add-item");
  });
  elFormProfileEdit.addEventListener("submit", (e) => {
    onSubmitEditProfile(e);
  });

  Array.from(elPopupBoxSection).forEach((popbox) => {
    popbox.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const { target, which } = e;
      if (
        target.classList.contains(`popup-box` && "popup-box_visible") &&
        which !== 3
      ) {
        onTogglePopUpopen(target.getAttribute("data-name"));
      }
    });
  });
  Array.from(elPopupBoxCloseBtn).forEach((btnElem) => {
    btnElem.addEventListener("click", (e) => {
      onTogglePopUpopen(e.target.name);
    });
  });
});


