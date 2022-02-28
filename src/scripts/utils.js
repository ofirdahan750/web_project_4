function closePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup-box_visible");
    closePopup(openedPopup);
    console.log('wow')
  }
}
function openPopup(popup) {
  popup.classList.add("popup-box_visible");
  document.addEventListener("keydown", closeByEscape);
}
export { openPopup, closePopup, closeByEscape };
