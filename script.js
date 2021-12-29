const elBody = document.querySelector(".page");
const elPopupBoxCloseBtn = document.querySelector(".popup-box__close-button");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");
const elPopupBox = document.querySelector(".popup-box");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileName = document.querySelector(".profile__name");
const elInputName = document.querySelector('input[name="name"]');
const elSubmitForm = document.querySelector(".popbox-box__form");
const elInputAboutMe = document.querySelector('input[name="about_me"]');

let isPopUpOpen;

function onInit() {
  isPopUpOpen = false;
  togglePopUpopen(true);
}

function togglePopUpopen(isInit) {
  if (!isInit) isPopUpOpen = !isPopUpOpen;
  if (!isPopUpOpen) {
    // elPopupBox.style.display = "none";
    elPopupBox.classList.remove("shown-flex-modifier");
    elPopupBox.classList.add("hidden-modifier");
    elInputName.value = "";
    elInputAboutMe.value = "";
  } else {
    elPopupBox.classList.remove("hidden-modifier");
    elPopupBox.classList.add("shown-flex-modifier");
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
