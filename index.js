const btnClose = document.querySelector('.close');
const btnNav = document.querySelector('.nav');
const navigationBar = document.querySelector('.navigation');
const btnSubmit = document.querySelector('.form__submit');
const form = document.querySelector('.form');
const navLinks = document.querySelector('.header__links');
const navBarlinks = document.querySelector('.navigation');

btnClose.addEventListener('click', function () {
  navigationBar.classList.add('hidden');
});

btnNav.addEventListener('click', function () {
  navigationBar.classList.remove('hidden');
});

// form.addEventListener('submit', function () {
//   document.querySelectorAll('.form__input').forEach(e => (e.value = ''));
//   document.getElementById('text__input').value = '';
//   console.log(e.target.value);
// });

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  let status = document.querySelector('#my-form-status');
  let data = new FormData(e.target);
  fetch(e.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        status.innerHTML = 'Thanks for your submission!';
        form.reset();
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data['errors']
              .map(error => error['message'])
              .join(', ');
          } else {
            status.innerHTML = 'Oops! There was a problem submitting your form';
          }
        });
      }
    })
    .catch(err => {
      status.innerHTML = 'Oops! There was a problem submitting your form';
    });
});

const goToLink = function (e) {
  e.preventDefault();

  if (e.target.classList.contains('link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
};

navLinks.addEventListener('click', goToLink);
navBarlinks.addEventListener('click', goToLink);
