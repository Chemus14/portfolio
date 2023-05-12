'use strict';

const btnContacts = document.querySelectorAll('.contact');
const btnContactBottom = document.querySelector('.contactBtn');
const formContact = document.querySelector('#contact-me');
const btnClose = document.querySelector('.close');
const navs = document.querySelectorAll('.nav');
const message = document.querySelector('.message');
const btnSubmit = document.querySelector('.submit');
const slides = document.querySelectorAll('.image');
const dotsContainer = document.querySelector('.dots-container');

// Display form if clicking in contact button
btnContacts.forEach(function (btn) {
  btn.addEventListener('click', function () {
    formContact.style.display = 'block';
    btnContactBottom.style.display = 'none';
  });
});

// Hide form if clicking in close button
btnClose.addEventListener('click', function () {
  formContact.style.display = 'none';
  btnContactBottom.style.display = 'block';
});

// Change the class active if clicking
navs.forEach(function (item) {
  item.addEventListener('click', function () {
    // Remove active class from currently active item
    const currentActive = document.querySelector('.nav.active');
    currentActive.classList.remove('active');

    // Add active class to clicked item
    item.classList.add('active');
  });
});

//Validations

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateNoEmptyInputs(form) {
  const inputs = form.querySelectorAll('input');

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === '') {
      return false; // Empty input found, form is invalid
    }
  }

  return true; // All inputs have values, form is valid
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number without any separators
  return phoneRegex.test(phoneNumber);
}

function formValidation(event) {
  // event.preventDefault();
  if (!validateNoEmptyInputs(formContact)) {
    message.innerHTML = 'You should fill up all the fields';
    return false;
  } else if (!validateEmail(formContact.Email.value)) {
    message.innerHTML = '';
    message.innerHTML = 'Introduce your mail again, there is some mistake';
    return false;
  }
  return true;
}

btnSubmit.addEventListener('click', formValidation);

// Slideshow

let currentSlideIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = 'block';
      slide.classList.add('fade');
    } else {
      slide.style.display = 'none';
      slide.classList.remove('fade');
    }
  });

  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active-dot');
    } else {
      dot.classList.remove('active-dot');
    }
  });
}

function nextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

slides.forEach((slide, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.addEventListener('click', () => {
    showSlide(index);
  });
  dotsContainer.appendChild(dot);
});

showSlide(currentSlideIndex);
setInterval(nextSlide, 100000);
