import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLink = link.dataset.link;
      document.querySelectorAll('.nav__link').forEach((el) => {
        el.classList.toggle('active', el.dataset.link === targetLink);
      });
    });
  });

  const popup = document.getElementById('callback-popup');
  const popupBtns = document.querySelectorAll('.open-callback');
  const popupClose = document.getElementById('popup-close');
  const popupContent = popup?.querySelector('.popup__content');
  const form = document.getElementById('callback-form');

  const hidePopup = () => {
    popup.classList.remove('visible');
    setTimeout(() => {
      form?.reset();
      form?.querySelectorAll('.error').forEach((el) => el.classList.remove('error'));
      form?.querySelectorAll('.error-message').forEach((el) => el.remove());
    }, 300);
  };

  popupBtns?.forEach((btn) => {
    btn.addEventListener('click', () => {
      popup.classList.add('visible');
      const nameInput = document.getElementById('name');
      setTimeout(() => nameInput?.focus(), 0);
      setMenuState(false);
    });
  });

  popupClose?.addEventListener('click', hidePopup);

  document.addEventListener('mousedown', (e) => {
    if (popup.classList.contains('visible') && popupContent && !popupContent.contains(e.target)) {
      hidePopup();
    }
  });

  const menu = document.getElementById('mobile-menu');
  const menuBtn = document.getElementById('menu-btn');
  const menuClose = document.getElementById('menu-close');
  const overlay = document.getElementById('menu-overlay');

  function setMenuState(isOpen) {
    if (isOpen) {
      menu.classList.remove('hidden');
      setTimeout(() => {
        menu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }, 0);
    } else {
      menu.classList.remove('open');
      overlay.classList.remove('active');
      setTimeout(() => {
        menu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && menu.classList.contains('open')) {
      setMenuState(false);
    }
  });

  menuBtn?.addEventListener('click', () => setMenuState(true));
  menuClose?.addEventListener('click', () => setMenuState(false));

  document.addEventListener('mousedown', (e) => {
    if (
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      setMenuState(false);
    }
  });

  const maskPhone = (event) => {
    let matrix = '+7 ___ ___ __ __';
    let i = 0;
    const def = matrix.replace(/\D/g, '');
    let val = event.target.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    event.target.value = matrix.replace(/./g, function (char) {
      return /[_\d]/.test(char) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : char;
    });
  };

  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener('input', maskPhone);
    input.addEventListener('focus', maskPhone);
    input.addEventListener('blur', maskPhone);
  });

  form?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameInput = form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[type="tel"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    [nameInput, phoneInput].forEach((input) => {
      input.classList.remove('error');
      const errorMsg = input.nextElementSibling;
      if (errorMsg?.classList.contains('error-message')) {
        errorMsg.remove();
      }
    });
    let hasError = false;
    if (!nameInput.value.trim()) {
      nameInput.classList.add('error');
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = 'Пожалуйста, введите имя';
      nameInput.after(error);
      hasError = true;
    }
    const phone = phoneInput.value.replace(/\D/g, '');
    if (phone.length !== 11) {
      phoneInput.classList.add('error');
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = 'Введите корректный номер телефона';
      phoneInput.after(error);
      hasError = true;
    }
    if (hasError) return;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    setTimeout(() => {
      alert('Спасибо! Мы свяжемся с вами :)');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
      hidePopup();
    }, 1500);
  });

  const categories = [
    'Классические',
    'Уточки панки',
    'Супергерои',
    'Милые',
    'Для детей',
    'Взрослым',
  ];

  const categoryScroll = document.getElementById('category-scroll');

  categories.forEach((title) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('category-element');
    const arrow = document.createElement('img');
    arrow.src = 'arrow.svg';
    arrow.alt = 'Указатель';
    wrapper.appendChild(arrow);
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = title;
    wrapper.appendChild(link);
    categoryScroll.appendChild(wrapper);
  });
});
