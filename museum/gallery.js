const pictureInnerContainer = document.querySelector(".inner-container");

let srcImage = [
  `<img class="picture" src="assets/img/galery1.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery2.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery3.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery4.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery5.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery6.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery7.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery8.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery9.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery10.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery11.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery12.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery13.jpg" alt="galery1">`,
  `<img class="picture" src="assets/img/galery14.jpg" alt="galery1">`,
];

window.onload = () =>
  srcImage
    .sort(() => Math.random() - 0.5)
    .map((img) => {
      srcImageNew = [...srcImage, img];
      pictureInnerContainer.innerHTML = srcImageNew.join("");
    });

window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".picture");
  for (let i = 0; i < reveals.length; i++) {
    let windowheight = window.innerHeight;
    let revealtop = reveals[i].getBoundingClientRect().top;
    let revealpoint = 150;

    if (revealtop < windowheight - revealpoint) {
      reveals[i].classList.add("active-galery");
    } else {
      reveals[i].classList.remove("active-galery");
    }
  }
}
