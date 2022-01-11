const body = document.querySelector(".page");

const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");

const placeGridContainer = document.querySelector(".places__grid-container");

const popupBoxSections = document.querySelectorAll(".popup-box");
const popupBoxCloseBtns = document.querySelectorAll(".popup-box__close-button");
const nameInput = document.querySelector('input[name="name"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');
const formProfileEdit = document.querySelector(
  'form[name="form_profile-edit"]'
);

const placeTitle = document.querySelector('input[name="title_place"]');
const imgLink = document.querySelector('input[name="img_link"]');
const formAddPlace = document.querySelector('form[name="form_add-place"]');

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

function onToggleLikedBtn(e) {
  e.target.classList.toggle("places__like-btn__active");
}
function onRemoveItem(e) {
  e.stopPropagation();
  const { parentNode } = e.currentTarget.parentNode;
  parentNode.remove();
}
function createCard(item) {
  const placeItemTemplate = document.querySelector(
    "#places-item-template"
  ).content;
  const cardElement = placeItemTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const placeImg = cardElement.querySelector(".places__img");
  placeImg.style.backgroundImage = `url(${item.link})`;
  placeImg.alt = `a photo of ${item.name}`;
  placeImg.addEventListener("click", () => {
    onOpenPopup("img", item);
  });
  cardElement.querySelector(".places__name").textContent = `${item.name}`;
  const btnPlace = cardElement.querySelector(".places__like-btn");
  btnPlace.addEventListener("click", (e) => {
    onToggleLikedBtn(e);
  });
  cardElement
    .querySelector(".places__remove-btn")
    .addEventListener("click", (e) => {
      onRemoveItem(e);
    });
  return cardElement;
}
function renderPlaceItem() {
  const htmlStr = initialCards.map((card) => {
    const placeItemElement = createCard(card);
    return placeItemElement;
  });

  placeGridContainer.append(...htmlStr);
}

function onOpenPopup(popupType, item = {}) {
  const popupBox = document.querySelector(
    `.popup-box.popup-box_type_${popupType}`
  );
  popupBox.classList.add("popup-box_visible");
  switch (popupType) {
    case "profile-edit":
      nameInput.value = profileName.textContent;
      aboutMeInput.value = aboutMe.textContent;
      break;
    case "img":
      popupBox.querySelector(".popup-box__img").src = item.link;
      popupBox.querySelector(
        ".popup-box__img"
      ).alt = `a pictrue of ${item.name}`;
      popupBox.querySelector(".popup-box__img-title").textContent = item.name;
      break;
    case "add-item":
      break;
    default:
      return;
  }
}
function onClosePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
  const popupboxContainer = popupBox.querySelector(".popup-box__container");
  popupboxContainer.classList.add("popup-box__container_display_none");
  setTimeout(() => {
    popupboxContainer.classList.remove("popup-box__container_display_none");
  }, 320);
}

function clearValueInput(...items) {
  items.forEach((item) => (item.value = ""));
}

function onSubmitEditProfile(e) {
  e.preventDefault();
  const { parentNode } = e.currentTarget.parentNode.parentNode;
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  clearValueInput(nameInput, aboutMeInput);
  onClosePopup(parentNode);
}

function onSubmitAddItem(e) {
  e.preventDefault();
  const { parentNode } = e.currentTarget.parentNode.parentNode;
  const objNewItem = {
    name: placeTitle.value,
    link: imgLink.value,
  };
  const newItem = createCard(objNewItem);
  placeGridContainer.prepend(newItem);
  clearValueInput(imgLink, placeTitle);
  onClosePopup(parentNode);
}

body.addEventListener = addEventListener("load", () => {
  renderPlaceItem();
  profileEditBtn.addEventListener("click", () => {
    onOpenPopup("profile-edit");
  });
  profileAddBtn.addEventListener("click", () => {
    onOpenPopup("add-item");
  });
  formProfileEdit.addEventListener("submit", (e) => {
    onSubmitEditProfile(e);
  });
  formAddPlace.addEventListener("submit", (e) => {
    onSubmitAddItem(e);
  });
  popupBoxSections.forEach((popup) => {
    popup.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const { target, which } = e;
      if (
        target.classList.contains(`popup-box` && "popup-box_visible") &&
        which !== 3
      ) {
        onClosePopup(target);
      }
    });
  });

  popupBoxCloseBtns.forEach((btnElem) => {
    btnElem.addEventListener("click", (e) => {
      const { parentNode } = e.currentTarget.parentNode;
      onClosePopup(parentNode);
    });
  });
});
