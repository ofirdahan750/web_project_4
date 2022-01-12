//Body global element
const body = document.querySelector(".page");
//Profile global element
const profileName = document.querySelector(".profile__name");
const aboutMe = document.querySelector(".profile__about-me");
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileAddBtn = document.querySelector(".profile__add-btn");
//Place global element
const placeGridContainer = document.querySelector(".places__grid-container");
//Popup all global elements popup section + close button
const popupBoxSections = document.querySelectorAll(".popup-box");
const popupBoxCloseBtns = document.querySelectorAll(".popup-box__close-button");
// Popup edit global element

const formProfileEdit = document.querySelector(
  'form[name="form_profile-edit"]'
);
const nameInput = document.querySelector('input[name="name"]');
const aboutMeInput = document.querySelector('input[name="about_me"]');
// popup add item to place global element
const placeTitle = document.querySelector('input[name="title_place"]');
const imgLink = document.querySelector('input[name="img_link"]');
const formAddPlace = document.querySelector('form[name="form_add-place"]');
// popup img item place global element

const popupImg = document.querySelector(".popup-box__img");
const popupImgTitle = document.querySelector(".popup-box__img-title");

const popupBoxsObj = {
  popupAddItemSection: document.querySelector(".popup-box_type_add-item"),
  popupImgSection: document.querySelector(".popup-box_type_img"),
  popupProfileEditSection: document.querySelector(
    ".popup-box_type_profile-edit"
  ),
};
const {popupAddItemSection,popupImgSection,popupProfileEditSection} = popupBoxsObj
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

function handleToggleLikedBtn(e) {
  e.target.classList.toggle("places__like-btn__active");
}
function findClosestParent(e, className) {
  return e.currentTarget.closest(className);
}
function onRemoveItem(e) {
  e.stopPropagation();
  const itemToRemove = findClosestParent(e, ".places__item");
  console.log("itemToRemove:", itemToRemove);
  itemToRemove.remove();
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
    openPopup(popupImgSection);
    handleImgPopup(item);
  });
  cardElement.querySelector(".places__name").textContent = `${item.name}`;
  const btnPlace = cardElement.querySelector(".places__like-btn");
  btnPlace.addEventListener("click", (e) => {
    handleToggleLikedBtn(e);
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
function openPopup(popup) {
  popup.classList.add("popup-box_visible");
}

function handleEditProfilePopup() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = aboutMe.textContent;
}
function handleImgPopup(item) {
  popupImg.src = item.link;
  popupImg.alt = `a pictrue of ${item.name}`;
  popupImgTitle.textContent = item.name;
}

function handleClosePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
}

function clearValueInput(...items) {
  items.forEach((item) => (item.value = ""));
}

function handleSubmitEditProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  aboutMe.textContent = aboutMeInput.value;
  clearValueInput(nameInput, aboutMeInput);
  handleClosePopup(popupProfileEditSection);
}

function handleSubmitAddItem(e) {
  e.preventDefault();
  const objNewItem = {
    name: placeTitle.value,
    link: imgLink.value,
  };
  const newItem = createCard(objNewItem);
  placeGridContainer.prepend(newItem);
  clearValueInput(imgLink, placeTitle);
  handleClosePopup(popupAddItemSection);
}

body.addEventListener = addEventListener("load", () => {
  renderPlaceItem();
  profileEditBtn.addEventListener("click", () => {
    openPopup(popupBoxsObj["popupProfileEditSection"]);
    handleEditProfilePopup();
  });
  profileAddBtn.addEventListener("click", () => {
    openPopup(popupBoxsObj["popupAddItemSection"]);
  });
  formProfileEdit.addEventListener("submit", (e) => {
    handleSubmitEditProfile(e);
  });
  formAddPlace.addEventListener("submit", (e) => {
    handleSubmitAddItem(e);
  });
  popupBoxSections.forEach((popup) => {
    popup.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      const { target, which,currentTarget } = e;
      const { classList } = target;
      if (which === 3) return;
      if (classList.contains("popup-box_visible")) {
        handleClosePopup(target);
      }
      if (classList.contains("popup-box__close-button")) {
        handleClosePopup(currentTarget);
      }
    });
  });
});
