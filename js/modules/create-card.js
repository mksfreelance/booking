const HOUSE_TYPE_MATCHES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const cardTemplateElement = document.querySelector('template[id="card"]').content.querySelector('.popup');

const generatePhotoUrls = (urlsArr) => {
  const photosFragmentElement = document.createDocumentFragment();
  urlsArr.forEach((item) => {
    const imgTemplate = document.querySelector('template[id="card"]').content.querySelector('.popup__photo').cloneNode(true);
    imgTemplate.src = item;
    photosFragmentElement.appendChild(imgTemplate);
  });
  return photosFragmentElement;
};
const generateFeatures = (arr) => {
  const featuresFragmentElement = document.createDocumentFragment();
  const featureCloneTemplateElement = document.querySelector('template[id="card"]').content.querySelector('.popup__features').cloneNode(true);
  const featureListElement = featureCloneTemplateElement.querySelectorAll('.popup__feature');
  const makeFeatureFullCss = arr.map((item) => `popup__feature--${item}`);
  featureListElement.forEach((listItem) => {
    const cssModifier = listItem.classList[1];
    if (makeFeatureFullCss.includes(cssModifier)) {
      featuresFragmentElement.appendChild(listItem);
    }
  });
  return featuresFragmentElement;
};

const setElementValue = (data, element, attr) => {
  if (data) {
    element[attr] = data;
  } else {
    element.remove();
  }
};

const createCard = (incomingData) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const featureCardElement = cardElement.querySelector('.popup__features');
  const photosCardElement = cardElement.querySelector('.popup__photos');
  setElementValue(incomingData.author.avatar, cardElement.querySelector('.popup__avatar'), 'src');
  setElementValue(incomingData.offer.title, cardElement.querySelector('.popup__title'), 'textContent');
  setElementValue(incomingData.offer.address, cardElement.querySelector('.popup__text--address'), 'textContent');
  setElementValue(incomingData.offer.price, cardElement.querySelector('.js_price'), 'textContent');
  setElementValue(HOUSE_TYPE_MATCHES[incomingData.offer.type], cardElement.querySelector('.popup__type'), 'textContent');
  setElementValue(incomingData.offer.description, cardElement.querySelector('.popup__description'), 'textContent');
  if (incomingData.offer.checkin && incomingData.offer.checkout) {
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после:${incomingData.offer.checkin}, выезд после ${incomingData.offer.checkout}`;
  } else {
    cardElement.querySelector('.popup__text--time').remove();
  }
  if (incomingData.offer.rooms && incomingData.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').textContent = `${incomingData.offer.rooms} комнаты для ${incomingData.offer.guests} гостей.`;
  } else {
    cardElement.querySelector('.popup__text--capacity').remove();
  }
  if (incomingData.offer.features) {
    featureCardElement.textContent = '';
    featureCardElement.appendChild(generateFeatures(incomingData.offer.features));
  } else {
    featureCardElement.remove();
  }
  if (incomingData.offer.photos) {
    photosCardElement.textContent = '';
    photosCardElement.appendChild(generatePhotoUrls(incomingData.offer.photos));
  } else {
    photosCardElement.remove();
  }
  return cardElement;
};

export { createCard };
