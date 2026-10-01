/*
  NEEZA — CONTACT.JS
  ---------------------------------------------------
  Handles:
  - Contact form submission
*/

document.addEventListener('DOMContentLoaded', function () {

  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const name =
      document.getElementById('contactName')?.value.trim();

    const email =
      document.getElementById('contactEmail')?.value.trim();

    const subject =
      document.getElementById('contactSubject')?.value.trim();

    const message =
      document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    alert(
      'Thank you for contacting NEEZA! We will get back to you soon.'
    );

    contactForm.reset();

  });

});