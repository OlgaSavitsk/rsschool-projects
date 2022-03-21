const dateControl = document.querySelector('input[type="date"]');
const timeControl = document.querySelector('input[type="time"]');
const dateCard = document.querySelector(".card-text.date");
const timeCard = document.querySelector(".card-text.time");
const inputName = document.querySelector('input[type="text"]');
const inputsInfo = document.querySelectorAll(".date-input.text");

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

function createErrorElement() {
  const el = document.createElement("label");
  el.id = "notify";
  el.setAttribute("for", "text");
  el.style.display = "none";
  return el;
}

function validateName(input, reg, error) {
  if (!input.value.match(reg)) {
    input.style.borderColor = "red";
    const errorEl = createErrorElement()
    input.insertAdjacentElement("afterend", errorEl);
    errorEl.style.display = "block";
    errorEl.innerText = error;
    if (input.value === "") {
      input.style.borderColor = "#030303";
      errorEl.style.display = "none";
    }
  } else {
    input.style.borderColor = "#030303";
    errorEl.style.display = "none";
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
