import { resetMap } from './map.js';
import { updateSliderOptions } from './no-ui-slider.js';
import { resetValidation } from './add-form-validation.js';
import { resetHousePreviews } from './upload-images.js';

const addFormElement = document.querySelector('.ad-form');
const resetAllButtonElement = document.querySelector('.ad-form__reset');
const adFormInputElements = document.querySelectorAll('.ad-form fieldset');
const adFormSelectElements = document.querySelectorAll('.ad-form__element');
const mapSelectElements = document.querySelectorAll('.map__filter');
const mapCheckBoxElements = document.querySelectorAll('.map__checkbox ');
const mapFiltersContainerElement = document.querySelector('.map__filters');

const setAllFormsDisabled = () => {
  addFormElement.classList.add('ad-form--disabled');
  adFormInputElements.forEach((element) => element.classList.add('ad-form--disabled'));
  adFormSelectElements.forEach((element) => element.setAttribute('disabled', 'true'));
  mapFiltersContainerElement.classList.add('map__filters--disabled');
  mapSelectElements.forEach((element) => element.setAttribute('disabled', 'true'));
  mapCheckBoxElements.forEach((element) => element.setAttribute('disabled', 'true'));
};

const setMapFiltersFormEnabled = () => {
  mapFiltersContainerElement.classList.remove('map__filters--disabled');
  mapSelectElements.forEach((element) => element.removeAttribute('disabled'));
  mapCheckBoxElements.forEach((element) => element.removeAttribute('disabled'));
};

const setAdFormEnabled = () => {
  addFormElement.classList.remove('ad-form--disabled');
  adFormInputElements.forEach((element) => element.classList.remove('ad-form--disabled'));
  adFormSelectElements.forEach((element) => element.removeAttribute('disabled'));
};

const resetForm = () => {
  addFormElement.reset();
  updateSliderOptions(0);
  resetValidation();
  resetMap();
  resetHousePreviews();
};

const setDefaultValues = () => {
  document.querySelector('input[id="price"]').placeholder = 'от 0';
  mapSelectElements.forEach((element) => {
    element.value = 'any';
  }
  );
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
  setDefaultValues();
};

resetAllButtonElement.addEventListener('click', (evt) => onResetButtonClick(evt));

export { setAllFormsDisabled, setAdFormEnabled, setMapFiltersFormEnabled, resetForm };
