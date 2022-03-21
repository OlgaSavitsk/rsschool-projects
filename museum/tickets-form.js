const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const dateCard = document.querySelector(".card-text.date");
const timeCard = document.querySelector(".card-text.time");
const inputName = document.querySelector('input[type="text"]');
const inputsInfo = document.querySelectorAll(".date-input.text");

var el = document.createElement("label");
el.id = "notify";
el.setAttribute("for", "text");
el.style.display = "none";
console.log(el);

const regExp = {
  name: {
    reg: /^[a-zA-Zа-яА-Я\s]{3,15}$/,
    error: "example: Name Female",
  },
  email: {
    reg: /^(([a-z0-9_-]{3,15}@([a-z]{4,}\.)[a-z]{2,}))$/,
    error: "example: username@example.com",
  },
  tel: {
    reg: /^([0-9- ]{0,10})$/,
    error: "example: 0123456789 or 012-35 678",
  },
};

function validateName(input, reg, error) {
  if (!input.value.match(reg)) {
    input.style.borderColor = "red";
    input.insertAdjacentElement("afterend", el);
    el.style.display = "block";
    el.innerText = error;
    if (input.value === "") {
      input.style.borderColor = "#030303";
      el.style.display = "none";
    }
  } else {
    input.style.borderColor = "#030303";
    el.style.display = "none";
  }
}

inputsInfo.forEach((input) => {
  input.addEventListener("input", function (e) {
    if (Object.keys(regExp).includes(e.target.name)) {
      validateName(
        input,
        regExp[e.target.name].reg,
        regExp[e.target.name].error
      );
    }
  });
});

function setDate() {
  let date = new Date();
  dateControl.setAttribute(
    "min",
    `${
      date.getFullYear() +
      "-" +
      (date.getMonth() > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      date.getDate()
    }`
  );
}

dateControl.addEventListener("change", function () {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = new Date(this.value).toLocaleDateString("en-US", options);
  dateCard.textContent = currentDate;
});

timeControl.addEventListener("change", function () {
  timeCard.textContent = timeControl.value;
});

setDate();
