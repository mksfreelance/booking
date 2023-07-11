import { createCard } from './create-card.js';

const ZOOM_LEVEL = 13;
const START_MAIN_PIN_POSITION = {
  lat: 35.681729,
  lng: 139.753927,
};

const addressInputElement = document.querySelector('#address');
const checkBoxFeatures = document.querySelectorAll('.map__checkbox');

let map = null;
let markerGroup = null;
let offersCopy = null;

const mainRedIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const blueIcon = L.icon({
  iconUrl: '../../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerRed = L.marker(
  START_MAIN_PIN_POSITION,
  {
    draggable: true,
    icon: mainRedIcon,
  },
);

const createMarker = ((offer) => {
  const markerBlue = L.marker(
    offer.location,
    {
      icon: blueIcon,
    },
  );
  markerBlue
    .addTo(markerGroup)
    .bindPopup(createCard(offer));
  return markerBlue;
});

const renderMarkers = (offers) => {
  map.closePopup();
  markerGroup.clearLayers();
  offers.forEach(createMarker);
};

const resetMap = () => {
  map.closePopup();
  checkBoxFeatures.forEach((item) => {
    item.checked = false;
  });
  addressInputElement.value = `${START_MAIN_PIN_POSITION.lat.toFixed(5)},${START_MAIN_PIN_POSITION.lng.toFixed(5)}`;
  markerRed.setLatLng(START_MAIN_PIN_POSITION);
  map.setView(START_MAIN_PIN_POSITION, ZOOM_LEVEL);
  renderMarkers(offersCopy.slice(0, 10));
};

const activateMap = (onLoad, offers) => {
  offersCopy = offers;
  map = L.map('map-canvas')
    .on('load', onLoad)
    .setView(START_MAIN_PIN_POSITION, ZOOM_LEVEL);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerRed.addTo(map);
  markerRed.on('drag', (evt) => {
    const coordinates = evt.target.getLatLng();
    addressInputElement.value = `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`;
  });

  markerGroup = L.layerGroup();
  markerGroup.addTo(map);
  renderMarkers(offers.slice(0, 10));
};

export { renderMarkers, activateMap, resetMap };
