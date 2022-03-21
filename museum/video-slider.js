const overlays = document.querySelectorAll(".overlay");
let videoItems = document.querySelectorAll(".video-slide");
const videoDots = document.querySelectorAll(".dots-slide");
const videoDotsContainer = document.querySelector(".dots-video-container");
const carousel = document.querySelector(".video-slider");
const slider = document.querySelector(".slider");
const progressRate = document.querySelector(".progress");

const mainCam = document.querySelector(".main-iframe");
const mainContainer = document.querySelector(".main-video");
let gap = 42;
let index = 1;

const firstClone = videoItems[0].cloneNode(true);
const lastClone = videoItems[videoItems.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";
slider.append(firstClone);
slider.prepend(lastClone);

const slideWidth = videoItems[index].clientWidth + gap;

slider.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  videoItems = document.querySelectorAll(".video-slide");
  if (index >= videoItems.length - 1) return;
  index++;
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
  slider.style.transition = ".7s";
};

const previouseSlide = () => {
  videoItems = document.querySelectorAll(".video-slide");
  if (index < 0) return;
  index--;
  slider.style.transform = `translateX(${-slideWidth * index}px)`;
  slider.style.transition = ".7s";
};

function toggleMainVideo(index) {
  const video = videoItems[index].children[0].getAttribute("data-src");
  const poster = videoItems[index].children[0].getAttribute("poster");
  mainCam.src = video;
  mainCam.poster = poster;
}

function toggleNextActiveVideoDot(currentItem) {
  if (currentItem > 1) {
    videoDots[currentItem - 1].classList.toggle("active-video");
    videoDots[currentItem - 2].classList.toggle("active-video");
  } else {
    videoDots[currentItem - 1].classList.toggle("active-video");
    videoDots[dots.length - 1].classList.remove("active-video");
  }
}

function togglePrevActiveVideoDot(currentItem) {
  if (currentItem === 0) {
    videoDots[videoDots.length - 1].classList.toggle("active-video");
    videoDots[0].classList.toggle("active-video");
  } else {
    videoDots[currentItem - 1].classList.toggle("active-video");
    videoDots[currentItem].classList.toggle("active-video");
  }
}

document
  .querySelector(".dots_button.rigth")
  .addEventListener("click", function () {
    startSlide();
    toggleNextActiveVideoDot(index);
    onPauseVideo();
    toggle.textContent = "\u23F5";
    playButton.style.display = "block";
    progressRate.carrentTime = 0;
    progressRate.setAttribute("value", "1");
    progressRate.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #fff 0%, white 100%)`;
    slider.addEventListener("transitionend", () => {
      videoItems = document.querySelectorAll(".video-slide");
      if (videoItems[index].nextElementSibling.id === firstClone.id) {
        slider.style.transition = "none";
        index = 0;
        slider.style.transform = `translateX(${0 * index}px)`;
      }
    });
    toggleMainVideo(index);
  });

document
  .querySelector(".dots_button.left")
  .addEventListener("click", function () {
    previouseSlide();
    togglePrevActiveVideoDot(index);
    onPauseVideo();
    toggle.textContent = "\u23F5";
    playButton.style.display = "block";
    slider.addEventListener("transitionend", () => {
      videoItems = document.querySelectorAll(".video-slide");
      if (videoItems[index].id === lastClone.id) {
        slider.style.transition = "none";
        index = 5;
        slider.style.transform = `translateX(${-2470}px)`;
      }
    });
    toggleMainVideo(index);
  });

slider.addEventListener("transitionend", () => {
  videoItems = document.querySelectorAll(".video-slide");
  if (videoItems[index].id === firstClone.id) {
    slider.style.transition = "none";
    index = 0;
    slider.style.transform = `translateX(${0 * index}px)`;
  }
});

videoDotsContainer.addEventListener("mousedown", function (event) {
  if (event.target.className != "dots-slide") return;
  videoDots.forEach((dot, index) => {
    dot.classList.remove("active-video");
    onPauseVideo();
    playButton.style.display = "block";
    progressRate.value = 0;
    dot.addEventListener("click", () => {
      videoItems = document.querySelectorAll(".video-slide");
      if (index >= videoItems.length - 1) return;
      index++;
      slider.style.transform = `translateX(${-slideWidth * index}px)`;
      slider.style.transition = ".7s";
      slider.addEventListener("transitionend", () => {
        videoItems = document.querySelectorAll(".video-slide");
        if (videoItems[index].nextElementSibling.id === firstClone.id) {
          slider.style.transition = "none";
          index = 0;
          slider.style.transform = `translateX(${0 * index}px)`;
        }
      });
      toggleMainVideo(index);
    });
  });
  event.target.classList.add("active-video");
});

overlays.forEach((item) => {
  item.addEventListener("click", function (event) {
    mainCam.pause();
    onPauseVideo();
    event.target.previousElementSibling.contentWindow.postMessage(
      '{"event": "command", "func": "playVideo", "args": ""}',
      "*"
    );
    event.target.classList.add("unvisible");
  });
});

function onPauseVideo() {
  overlays.forEach((item) => {
    item.classList.remove("unvisible");
    item.previousElementSibling.contentWindow.postMessage(
      '{"event": "command", "func": "pauseVideo", "args": ""}',
      "*"
    );
  });
}
