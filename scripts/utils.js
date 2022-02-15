import {
  elementDom,
  handleSubmitAddItem,
  handleEditProfilePopup,
  handleSubmitEditProfile,
} from "./index.js";

export { onInit, clearValueInput, openPopup, handleClosePopup };

function handleClosePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
  document.removeEventListener("keydown", closeByEscape);
}

function clearValueInput(...items) {
  items.forEach((item) => (item.value = ""));
}

function onInit() {
  const {
    popupProfileEditSection,
    popupAddItemSection,
    profileEditBtn,
    profileAddBtn,
    formProfileEdit,
    formAddPlace,
    popupBoxSections,
  } = elementDom;

  profileEditBtn.addEventListener("click", () => {
    openPopup(popupProfileEditSection);
    handleEditProfilePopup();
  });
  profileAddBtn.addEventListener("click", () => {
    openPopup(popupAddItemSection);
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
      const { target, currentTarget } = e;
      const { classList } = target;
      if (classList.contains("popup-box__wrapper") || e.button === 2) return;
      if (target.closest(".popup-box_visible")) {
        handleClosePopup(target);
      }
      if (target.closest(".popup-box__close-button")) {
        handleClosePopup(currentTarget);
      }
    });
    popup.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  });
}
function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup-box_visible");
    handleClosePopup(openedPopup);
  }
}
function openPopup(popup) {
  popup.classList.add("popup-box_visible");
  document.addEventListener("keydown", closeByEscape);
}
