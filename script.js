const elBody = document.querySelector(".page");
const elPlacesGridContainer = document.querySelector(".place__grid-container");
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
    isLiked: true,
  },
];
function onInit() {
  elPlacesGridContainer.insertAdjacentHTML("afterbegin", renderGrid());
}

function renderGrid() {
  let txtHtml = "";

  for (let i = 0; i < itemArray.length; i++) {
    const { isLiked, name } = itemArray[i];
    const likedBtnStatus = isLiked ? "--active" : "";
    txtHtml += `
    <li class="places__item">
              <img
                class="places__img"
                src='./images/places/places_img/${name}.png'
                alt="a photo of ${name}"
              />
              <div class="places__info-wrapper">
                <p class="places__name">${name}</p>
                <div
                  class="places__like-btn${likedBtnStatus}"
                /></div>
              </div>
            </li>
    `;
  }
  return txtHtml;
}
elBody.addEventListener("load", onInit());
