export { openPopup, handleClosePopup, closeByEscape };
function handleClosePopup(popupBox) {
  popupBox.classList.remove("popup-box_visible");
  document.removeEventListener("keydown", closeByEscape);
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
