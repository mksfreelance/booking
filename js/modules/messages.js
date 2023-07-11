import { resetForm } from './form.js';

const ERROR_SHOW_TIME = 5000;
const ESC_KEY = 27;
const submitButton = document.querySelector('.ad-form__submit');
const successTemplateElement = document.querySelector('template[id="success"]')
  .content.querySelector('.success').cloneNode(true);
const successFragmentElement = document.createDocumentFragment();
const errorTemplateElement = document.querySelector('template[id="error"]')
  .content.querySelector('.error').cloneNode(true);
const errorFragmentElement = document.createDocumentFragment();

const onPopupEscKeydown = (evt) => {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
};

const onClickPopUpClose = () => {
  closePopup();
};

function closePopup() {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onClickPopUpClose);
}
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessModal = () => {
  successFragmentElement.append(successTemplateElement);
  document.body.append(successFragmentElement);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onClickPopUpClose);
  resetForm();
};
const showErrorModal = () => {
  errorFragmentElement.append(errorTemplateElement);
  document.body.append(errorFragmentElement);
  document.addEventListener('click', onClickPopUpClose);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ERROR_SHOW_TIME);
};

export { showAlert, blockSubmitButton, unblockSubmitButton, showSuccessModal, showErrorModal };
