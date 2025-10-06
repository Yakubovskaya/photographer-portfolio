document.addEventListener("DOMContentLoaded", () => {
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

  //slider

  const sliderWrapper = document.querySelector(".slider__wrapper");
  const sliderList = document.querySelector(".slider__list");
  const slides = sliderList.querySelectorAll(".slider__item");

  const margin = 20;
  let position = 0;
  let direction = 0;
  let maxPosition = 0;
  let totalWidth;
  let start = 0;
  let isTouching = false;

  function calculateWidths() {
    totalWidth = 0;
    slides.forEach((slide, index) => {
      totalWidth += slide.offsetWidth;
      if (index < slides.length - 1) {
        totalWidth += margin;
      }
    });

    sliderList.style.paddingLeft = "20px";
    sliderList.style.paddingRight = "20px";

    const wrapperWidth = sliderWrapper.offsetWidth;
    maxPosition = totalWidth - wrapperWidth;

    position = (totalWidth - wrapperWidth) / 2;
    updateSlider();
  }

  function updateSlider() {
    if (position < 0) {
      position = 0;
    }
    if (position > maxPosition) {
      position = maxPosition;
    }
    sliderList.style.transform = `translateX(-${position}px)`;
  }

  const handleMouseMove = (event) => {
    const wrapperWidth = sliderWrapper.offsetWidth;
    const mouseX = event.clientX - sliderWrapper.getBoundingClientRect().left;

    if (mouseX < wrapperWidth * 0.3) {
      direction = -1;
    } else if (mouseX > wrapperWidth * 0.7) {
      direction = 1;
    } else {
      direction = 0;
    }
  }

  function animate() {
    if (direction !== 0) {
      position += direction * 3;
      updateSlider();
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", calculateWidths);

  sliderWrapper.addEventListener("touchstart", (event) => {
    start = event.touches[0].clientX;
    isTouching = true;
  });

  sliderWrapper.addEventListener("touchmove", (event) => {
    const current = event.touches[0].clientX;
    const changing = start - current;

    position += changing;
    updateSlider();

    start = current;
  });

  sliderWrapper.addEventListener("touchend", () => {
    isTouching = false;
  });

  function checkDevice() {
  if (window.innerWidth <= 768) {
    sliderWrapper.removeEventListener("mousemove", handleMouseMove);
  } else {
    sliderWrapper.addEventListener("mousemove", handleMouseMove);
  }
}

  window.addEventListener("resize", () => {
    calculateWidths();
    checkDevice();
  });

  checkDevice();
  calculateWidths();
  animate();
});
