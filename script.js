const elBody = document.querySelector(".page");
const elRoot = document.querySelector(".root");
const elPopupBoxCloseBtn = document.querySelector(".popup-box__close-button");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");
const elPlacesGridContainer = document.querySelector(".place__grid-container");
const elPopupBox = document.querySelector(".popup-box");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileName = document.querySelector(".profile__name");
const elInputName = document.querySelector('input[name="name"]');
const elSubmitForm = document.querySelector(".popbox-box__form");
const elInputAboutMe = document.querySelector('input[name="about_me"]');

let isPopUpOpen;

const itemArray = [
  {
    name: "Yosemite Valley",
    isLiked: false,
  },
  {
    name: "Lake Louise",
    isLiked: false,
  },
  {
    name: "Bald Mountains",
    isLiked: false,
  },
  {
    name: "Latemar",
    isLiked: false,
  },
  {
    name: "Vanoise National Park",
    isLiked: false,
  },
  {
    name: "Lago di Braies",
    isLiked: false,
  },
];
function onInit() {
  isPopUpOpen = false;
  elPlacesGridContainer.insertAdjacentHTML("afterbegin", renderGrid());
  togglePopUpopen(true);
}

function renderGrid() {
  let txtHtml = "";

  for (let i = 0; i < itemArray.length; i++) {
    const { isLiked, name } = itemArray[i];
    const likedBtnStatus = isLiked ? "__active" : "";
    txtHtml += `
    <li class="places__item">
              <img
                class="places__img"
                src='./images/places/places_img/${name}.png'
                alt="a photo of ${name}"
              />
              <div class="places__info-wrapper">
                <h2 class="places__name">${name}</h2>
                <button type="button"
                  class="places__like-btn${likedBtnStatus} button-modifier"
                /></div>
              </div>
            </li>
    `;
  }
  return txtHtml;
}
function togglePopUpopen(isInit) {
  if (!isInit) isPopUpOpen = !isPopUpOpen;
  if (!isPopUpOpen) {
    // elPopupBox.style.display = "none";
    elPopupBox.classList.remove('shown-flex-modifier')
    elPopupBox.classList.add('hidden-modifier')
    elInputName.value = "";
    elInputAboutMe.value = "";
  } else {
    elPopupBox.classList.remove('hidden-modifier')
    elPopupBox.classList.add('shown-flex-modifier')
    elInputName.value = elProfileName.textContent;
    elInputAboutMe.value = elAboutMe.textContent;
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  elProfileName.textContent = elInputName.value;
  elAboutMe.textContent = elInputAboutMe.value;
  togglePopUpopen();
}

elBody.addEventListener = addEventListener("load", function () {
  onInit();
});
elProfileEditBtn.addEventListener("click", function () {
  togglePopUpopen();
});
elPopupBoxCloseBtn.addEventListener("click", function () {
  togglePopUpopen();
});
elSubmitForm.addEventListener("submit", handleProfileFormSubmit);
