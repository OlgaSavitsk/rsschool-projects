const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const count = document.querySelector(".number");
const minusSenior = document.querySelector(".seniorMinus");
const plusSenior = document.querySelector(".seniorPlus");
const countSenior = document.querySelector(".seniorInput");
const button = document.querySelector(".tickets__button");
const modal = document.querySelector(".tickets-modal");
const opacity = document.querySelector(".cover");
const closeBtn = document.querySelector(".close");
const totalCost = document.querySelector(".total");
// tickets form
const inputs = document.querySelectorAll("input");
const radioType = document.getElementsByName("radio");
const ticketsSelect = document.getElementById("tickets-type");
const ticketsTypeOption = document.getElementsByTagName("option");
const countFormBasic = document.querySelector(".count-modal.basic");
const countFormSenior = document.querySelector(".count-modal.senior");
const numberOfTickets = document.querySelectorAll(".count-modal");
const plusFormBasic = document.querySelector(".plus.modal.basic");
const minusFormBasic = document.querySelector(".minus.modal.basic");
const plusFormSenior = document.querySelector(".plus.senior");
const minusFormSenior = document.querySelector(".minus.senior");
const priceFormBasic = document.querySelectorAll(".count-subtitle-modal.basic");
const priceFormSenior = document.querySelectorAll(
  ".count-subtitle-modal.senior"
);
const totalCostForm = document.querySelector(".total-sum");
const totalPriceForBasic = document.querySelector(".cost-text.euro.basic");
const totalPriceForSenior = document.querySelector(".cost-text.euro.senior");
const typeCard = document.querySelector(".card-text.type");

let basePrice = 30;

// calculation of the amount on the main page
function calculate() {
  let totalSum = basePrice;
  for (const radio of radioType) {
    if (radio.checked) {
      totalSum =
        parseInt(radio.value * count.value) +
        parseFloat((radio.value / 2) * countSenior.value);
      const Tickets = {
        type: radio.value,
        cost: totalSum,
        basic: count.value,
        senior: countSenior.value,
      };
      localStorage.setItem("tickets", JSON.stringify(Tickets));
      Array.from(ticketsTypeOption).forEach((element) => {
        if (radio.previousSibling.nodeValue === element.value) {
          element.setAttribute("selected", "selected");
          element.previousElementSibling.removeAttribute("selected");
          totalPriceForBasic.innerHTML = `${calculateForm(
            countFormBasic,
            radio.value
          )} &euro;`;
          totalPriceForSenior.innerHTML = `${calculateForm(
            countFormSenior,
            radio.value / 2
          )} &euro;`;
        }
      });
    }
    setNumberOfTickets();
  }
  setInfoTickets(totalSum);
}

function setInfoTickets(totalSum) {
  countFormBasic.value = count.value;
  countFormSenior.value = countSenior.value;
  totalCost.innerText = `Total €${totalSum}`;
  totalCostForm.innerHTML = `${totalSum}€`;
}

for (const input of inputs) {
  input.addEventListener("input", () => {
    calculate();
  });
}

function setSumm(element, minus) {
  element.value++;
  calculate();
  if (element.value > 0) {
    minus.removeAttribute("disabled");
  }
  if (element.value > 19) {
    element.value = 20;
  }
}

function setDiff(element, minus) {
  element.value--;
  calculate();
  if (element.value < 1) {
    element.value = 0;
    minus.setAttribute("disabled", "disabled");
  }
}

// popup calculation
function calculateForm(number, price) {
  return parseFloat(number.value * price);
}

function setCostOfFormTickets(e) {
  Array.from(ticketsTypeOption).forEach((element) => {
    if (e.target.value === element.value) {
      element.setAttribute("selected", "selected");
      typeCard.textContent = element.value;
      priceFormBasic.innerHTML = `Basic 18+ (${element.dataset.cost}&euro;)`;
      totalPriceForBasic.innerHTML = `${calculateForm(
        countFormBasic,
        element.dataset.cost
      )} &euro;`;
      priceFormSenior.innerHTML = `Senior 65+ (${
        element.dataset.cost / 2
      }&euro;)`;
      totalPriceForSenior.innerHTML = `${calculateForm(
        countFormSenior,
        element.dataset.cost / 2
      )} &euro;`;
    }
  });
}

function setNumberOfTickets() {
  numberOfTickets.forEach((number) => {
    if (number.dataset.count === "basic") {
      number.innerText = countFormBasic.value;
    } else {
      number.innerText = countSenior.value;
    }
  });
}

// setting data after page update
function reloadData() {
  let storageValue = JSON.parse(localStorage.getItem("tickets"));
  count.value = storageValue.basic;
  countSenior.value = storageValue.senior;
  totalCost.innerText = `Total €${storageValue.cost}`;
  countFormBasic.value = storageValue.basic;
  countFormSenior.value = storageValue.senior;
  totalCostForm.innerHTML = `${storageValue.cost}€`;
  setRadioType(storageValue);
  setNumberOfTickets();
}

function setRadioType(storageValue) {
  for (const radio of radioType) {
    if (radio.value === storageValue.type) {
      radio.setAttribute("checked", "checked");
    }
    if (radio.checked) {
      Array.from(ticketsTypeOption).forEach((element) => {
        if (radio.previousSibling.nodeValue === element.value) {
          element.setAttribute("selected", "selected");
          priceFormBasic.forEach((priceBasic) => {
            priceBasic.innerHTML = `Basic 18+ (${element.dataset.cost}&euro;)`;
            totalPriceForBasic.innerHTML = `${calculateForm(
              countFormBasic,
              element.dataset.cost
            )} €`;
          });
          priceFormSenior.forEach((priceSenior) => {
            priceSenior.innerHTML = `Senior 65+ (${
              element.dataset.cost / 2
            }&euro;)`;
            totalPriceForSenior.innerHTML = `${calculateForm(
              countFormSenior,
              element.dataset.cost / 2
            )} €`;
          });
          element.previousElementSibling.removeAttribute("selected");
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  totalCost.innerText = `Total €${basePrice}`;
  if (localStorage.getItem("tickets")) {
    reloadData();
  }
});

plus.addEventListener("click", function () {
  setSumm(count, minus);
});

minus.addEventListener("click", function () {
  setDiff(count, minus);
});

plusSenior.addEventListener("click", function () {
  setSumm(countSenior, minusSenior);
});

minusSenior.addEventListener("click", function () {
  setDiff(countSenior, minusSenior);
});

plusFormBasic.addEventListener("click", function (e) {
  e.preventDefault();
  setSumm(count, minusFormBasic);
});

minusFormBasic.addEventListener("click", function (e) {
  e.preventDefault();
  setDiff(count, minusFormBasic);
});

plusFormSenior.addEventListener("click", function (e) {
  e.preventDefault();
  setSumm(countSenior, minusFormSenior);
});

minusFormSenior.addEventListener("click", function (e) {
  e.preventDefault();
  setDiff(countSenior, minusFormSenior);
});

ticketsSelect.addEventListener("change", function (e) {
  setCostOfFormTickets(e);
});

button.addEventListener("click", function () {
  modal.classList.add("move");
  opacity.classList.add("visible");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("move");
  opacity.classList.remove("visible");
});

opacity.addEventListener("click", function () {
  modal.classList.remove("move");
  opacity.classList.remove("visible");
});
