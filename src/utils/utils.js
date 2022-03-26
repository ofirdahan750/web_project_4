function getRandomString(length = getRandomInt()) {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");

  if (!length) {
    length = Math.floor(Math.random() * chars.length);
  }

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function getRandomInt(min = 100, max = 150) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function elementTextModifying(element, txt = "Saving...") {
  element.textContent = txt;
}
function runFuncTimeOut(func, time) {
  setTimeout(func, time);
}
export { getRandomString, elementTextModifying, runFuncTimeOut };
