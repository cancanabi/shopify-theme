(() => {
  const POPUP_SELECTOR = '[data-welcome-popup]';
  const overlaySelector = '[data-welcome-popup-overlay]';
  const closeSelector = '[data-welcome-popup-close]';
  const delayMs = 5000;

  const init = () => {
    const popup = document.querySelector(POPUP_SELECTOR);
    if (!popup) return;

    const overlay = popup.querySelector(overlaySelector);
    const closeButtons = popup.querySelectorAll(closeSelector);
    let isOpen = false;
    let timerId;

    const openPopup = () => {
      if (isOpen) return;
      popup.classList.add('is-active');
      popup.setAttribute('aria-hidden', 'false');
      isOpen = true;
    };

    const scheduleOpen = () => {
      window.clearTimeout(timerId);
      timerId = window.setTimeout(openPopup, delayMs);
    };

    const closePopup = () => {
      if (!isOpen) return;
      popup.classList.remove('is-active');
      popup.setAttribute('aria-hidden', 'true');
      isOpen = false;
      scheduleOpen();
    };

    const handleClose = (event) => {
      event.preventDefault();
      closePopup();
    };

    closeButtons.forEach((button) => {
      button.addEventListener('click', handleClose);
    });

    if (overlay) {
      overlay.addEventListener('click', handleClose);
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen) {
        closePopup();
      }
    });

    scheduleOpen();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
