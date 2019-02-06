var error = document.querySelector(".main__error");
var success = document.querySelector(".main__success");
function hideElement(element) {
  if (element) {
    setTimeout(function() {
      element.setAttribute("style", "display:none");
    }, 2500);
  }
}

hideElement(error);
hideElement(success);
