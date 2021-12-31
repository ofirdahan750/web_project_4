const elBody = document.querySelector(".page");
const elPopupBoxCloseBtn = document.querySelector(".popup-box__close-button");
const elProfileEditBtn = document.querySelector(".profile__edit-btn");
const elPopupBox = document.querySelector(".popup-box");
const elAboutMe = document.querySelector(".profile__about-me");
const elProfileName = document.querySelector(".profile__name");
const elInputName = document.querySelector('input[name="name"]');
const elSubmitForm = document.querySelector('form[name="popup-box_form"]');
const elInputAboutMe = document.querySelector('input[name="about_me"]');

let isPopUpOpen;

function onInit() {
  isPopUpOpen = false;
  onTogglePopUpopen(true);
}

function onTogglePopUpopen(isInit) {
  if (!isInit) isPopUpOpen = !isPopUpOpen;
  if (!isPopUpOpen) {
    elPopupBox.classList.remove("popup-box_visible");
    elInputName.value = "";
    elInputAboutMe.value = "";
  } else {
    elPopupBox.classList.add("popup-box_visible");
    elInputName.value = elProfileName.textContent;
    elInputAboutMe.value = elAboutMe.textContent;
  }
}

function onHandleProfileFormSubmit(evt) {
  evt.preventDefault();
  elProfileName.textContent = elInputName.value;
  elAboutMe.textContent = elInputAboutMe.value;
  onTogglePopUpopen();
}

elBody.addEventListener = addEventListener("load", function () {
  onInit();
});

elProfileEditBtn.addEventListener("click", function () {
  onTogglePopUpopen();
});

elPopupBoxCloseBtn.addEventListener("click", () => {
  onTogglePopUpopen();
});

elSubmitForm.addEventListener("submit", onHandleProfileFormSubmit);
