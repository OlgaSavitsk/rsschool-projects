const items = document.querySelectorAll(".project-image");
const dots = document.querySelectorAll(".dots-slide-welcome");
const dotsContainer = document.querySelector(".dots-container");
const slideNumber = document.querySelector(".dots-text");

let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function previouseItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document
  .querySelector(".dots_button-welcome.left")
  .addEventListener("click", function () {
    if (isEnabled) {
      previouseItem(currentItem);
      slideNumber.innerHTML = `0${currentItem + 1} / 05`;
      togglePrevActiveDot(currentItem);
    }
  });

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document
  .querySelector(".dots_button-welcome.right")
  .addEventListener("click", function () {
    if (isEnabled) {
      nextItem(currentItem);
      slideNumber.innerHTML = `0${currentItem + 1} / 05`;
      toggleNextActiveDot(currentItem);
    }
  });

dotsContainer.addEventListener("mousedown", function (event) {
  if (event.target.className != "dots-slide-welcome") return;
  dots.forEach((dot, index) => {
    dot.classList.remove("active-dot");
    dot.addEventListener("click", () => {
      slideNumber.innerHTML = `0${index + 1} / 05`;
      if (isEnabled) {
        hideItem("to-left");
        changeCurrentItem(index);
        showItem("from-right");
      }
    });
  });
  event.target.classList.add("active-dot");
});

// flipping slides left and right with swipe (movements) of the mouse

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let threshold = 100;
  let restrain = 750;
  let startTime = 0;
  let elapsedTime = 0;
  let allowedTime = 300;

  surface.addEventListener("mousedown", function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener("mouseup", function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) <= restrain) {
        if (distX > 0) {
          if (isEnabled) {
            previouseItem(currentItem);
            slideNumber.innerHTML = `0${currentItem + 1} / 05`;
            togglePrevActiveDot(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
            slideNumber.innerHTML = `0${currentItem + 1} / 05`;
            toggleNextActiveDot(currentItem);
          }
        }
      }
    }
    e.preventDefault();
  });
};

function toggleNextActiveDot(currentItem) {
  if (currentItem > 0) {
    dots[currentItem].classList.toggle("active-dot");
    dots[currentItem - 1].classList.toggle("active-dot");
  } else {
    dots[currentItem].classList.toggle("active-dot");
    dots[dots.length - 1].classList.remove("active-dot");
  }
}

function togglePrevActiveDot(currentItem) {
  if (currentItem === dots.length - 1) {
    dots[currentItem].classList.toggle("active-dot");
    dots[0].classList.toggle("active-dot");
  } else {
    dots[currentItem].classList.toggle("active-dot");
    dots[currentItem + 1].classList.toggle("active-dot");
  }
}

var el = document.querySelector(".carousel");
swipedetect(el);
