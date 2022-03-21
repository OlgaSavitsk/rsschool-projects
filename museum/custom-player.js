const player = document.querySelector(".video");
const mainPlayer = document.querySelector(".main-video");
const toggle = document.querySelector(".toggle");
const volume = player.querySelector(".progress-volume");
const volumeMute = player.querySelector(".mute");
const volumeIcon = player.querySelector(".volume-icon");
const playButton = document.querySelector(".playButton");
const flSc = document.querySelector(".fullscreen");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-bar_container");
const speedTooltip = document.querySelector(".tooltip");

function togglePlay() {
  if (mainCam.paused) {
    ("play");
    playButton.style.display = "none";
  } else {
    ("pause");
    playButton.style.display = "block";
  }
}

function playVideo() {
  if (mainCam.paused) {
    mainCam.play();
    ("play");
    playButton.style.display = "none";
  } else {
    mainCam.pause();
    ("pause");
    playButton.style.display = "block";
  }
}

function toggleButton() {
  const icon = this.paused ? "\u23F5" : "\u23F8";
  toggle.textContent = icon;
}

function handleRange() {
  mainCam.volume = this.value;
  value = this.value * 100;
  volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  if (value === 0) {
    volumeMute.style.display = "block";
    volumeIcon.style.display = "none";
  } else {
    volumeMute.style.display = "none";
    volumeIcon.style.display = "block";
  }
}

function handleProgress() {
  const percent = (mainCam.currentTime / mainCam.duration) * 100;
  progressRate.value = percent;
  progressRate.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #fff ${percent}%, white 100%)`;
  if (percent === 100) {
    playButton.style.display = "block";
  }
}

function scrub(e) {
  const scrubTime = (e.offsetX / progressRate.offsetWidth) * mainCam.duration;
  mainCam.currentTime = scrubTime;
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    mainCam.classList.add("scale");
    progressContainer.classList.add("fixed");
  } else {
    document.exitFullscreen();
    mainCam.classList.remove("scale");
    progressContainer.classList.remove("fixed");
  }
};

flSc.addEventListener("mousedown", toggleFullScreen);

mainCam.addEventListener("click", togglePlay);
mainCam.addEventListener("click", playVideo);
mainCam.addEventListener("play", toggleButton);
mainCam.addEventListener("pause", toggleButton);

toggle.addEventListener("click", playVideo);

playButton.addEventListener("click", playVideo);
volume.addEventListener("change", handleRange);
volume.addEventListener("mousemove", handleRange);
let isMute = false;
volumeIcon.addEventListener("click", function () {
  mainCam.volume = 0;
  volumeMute.style.display = "block";
  volumeIcon.style.display = "none";
  isMute = !isMute;
});
volumeMute.addEventListener("click", function () {
  isMute = isMute;
  mainCam.volume = volume.value;
  volumeMute.style.display = "none";
  volumeIcon.style.display = "block";
});
mainCam.addEventListener("timeupdate", handleProgress);
mainCam.addEventListener(
  "ended",
  function () {
    mainCam.currentTime = 0;
  },
  false
);

let mousedown = false;
progressRate.addEventListener("click", scrub);
progressRate.addEventListener("mousemove", (e) => mousedown && scrub(e));
progressRate.addEventListener("mousedown", () => (mousedown = true));
progressRate.addEventListener("mouseup", () => (mousedown = false));

let downKeys = {};
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 77) {
    e.preventDefault();
    mainCam.volume = 0;
    volumeMute.style.display = "block";
    volumeIcon.style.display = "none";
    isMute = !isMute;
  }
  if (e.keyCode === 77 && !isMute) {
    e.preventDefault();
    isMute = isMute;
    mainCam.volume = volume.value;
    volumeMute.style.display = "none";
    volumeIcon.style.display = "block";
  }
  if (e.keyCode === 32) {
    e.preventDefault();
    mainCam.pause();
    isMute = !isMute;
  }
  if (e.keyCode === 32 && !isMute) {
    e.preventDefault();
    mainCam.play();
    isMute = isMute;
  }
  if (e.keyCode === 70) {
    e.preventDefault();
    toggleFullScreen();
  }
  downKeys[e.keyCode] = true;
  if (downKeys[16] && downKeys[107]) {
    e.preventDefault();
    if (mainCam.playbackRate === 2) {
      mainCam.playbackRate = 2;
    } else {
      mainCam.playbackRate += 0.25;
      speedTooltip.style.display = "block";
      speedTooltip.innerHTML = `x${mainCam.playbackRate}`;
    }
  }
  if (downKeys[16] && downKeys[109]) {
    e.preventDefault();
    if (mainCam.playbackRate === 0.25) {
      mainCam.playbackRate = 0.25;
    } else {
      mainCam.playbackRate -= 0.25;
      speedTooltip.style.display = "block";
      speedTooltip.innerHTML = `x${mainCam.playbackRate}`;
    }
  }
});

document.addEventListener("keyup", (event) => {
  downKeys[event.keyCode] = false;
  setTimeout(() => {
    speedTooltip.style.display = "none";
  }, 1000);
});

document.querySelector(".range-input").addEventListener("input", function () {
  document.querySelector(".original-image").style.width = this.value + "%";
});
