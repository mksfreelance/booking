import { activateFormValidation } from './modules/add-form-validation.js';
import { setAllFormsDisabled, setAdFormEnabled, setMapFiltersFormEnabled } from './modules/form.js';
import { activateMap } from './modules/map.js';
import { activateSlider } from './modules/no-ui-slider.js';
import { fetchOffers } from './modules/fetch-api.js';
import { initFilters } from './modules/offers-filter.js';
import { initUploadAvatar, initUploadHousePic } from './modules/upload-images.js';
import { showAlert } from './modules/messages.js';

setAllFormsDisabled();

fetchOffers((offers) => {
  activateMap(setAdFormEnabled, offers);
  initFilters(offers);
}, setMapFiltersFormEnabled, (error) => showAlert(`Ошибка загрузки данных, попробуйте обновить страницу. ${error}`));

initUploadAvatar();
initUploadHousePic();
activateSlider();
activateFormValidation();
