//burger menu
const menu = document.querySelector(".menu__nav"),
  menuItem = document.querySelectorAll(".nav__item"),
  hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger--active");
  menu.classList.toggle("menu__nav--active");
  document.body.classList.toggle("modal-open");
});

menuItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const targetID = item.getAttribute("href");

    hamburger.classList.toggle("hamburger--active");
    menu.classList.toggle("menu__nav--active");
    document.body.classList.toggle("modal-open");

    setTimeout(() => {
      document.querySelector(targetID).scrollIntoView({
        behavior: "smooth",
      });
    }, 300);
  });
});

//accordion

const accordionItems = document.querySelectorAll(".accordion__item"),
  accordionHeader = document.querySelector(".accordion__label");

const savedIndex = sessionStorage.getItem("activeAccordionIndex");
if (savedIndex !== null && accordionItems[savedIndex]) {
  accordionItems[savedIndex].classList.add("accordion__item--active");
  accordionItems[0].classList.remove("accordion__item--active");
} else {
  accordionItems[0].classList.add("accordion__item--active");
}

accordionItems.forEach((item, index) => {
  const header = item.querySelector(".accordion__label");
  header.addEventListener("click", () => {
    accordionItems.forEach((el) => {
      if (el !== item) {
        el.classList.remove("accordion__item--active");
      }
    });
    item.classList.toggle("accordion__item--active");

    if (item.classList.contains("accordion__item--active")) {
      sessionStorage.setItem("activeAccordionIndex", index);
    } else {
      sessionStorage.removeItem("activeAccordionIndex");
    }
  });
});

// modal

const cardBtn = document.querySelectorAll(".package-card__button"),
  closeBtn = document.querySelector(".modal__close-button"),
  overlay = document.querySelector(".overlay"),
  modal = document.querySelector(".modal"),
  form = document.querySelector(".modal__form");

const openModal = () => {
  overlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  overlay.classList.add("hidden");
  document.body.classList.remove("modal-open");
  form.reset();
};

cardBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal();
  });
});

const onCloseBtnClick = () => {
  closeModal();
};

closeBtn.addEventListener("click", onCloseBtnClick);

overlay.addEventListener("click", (evt) => {
  if (!modal.contains(evt.target)) {
    closeModal();
  }
});
