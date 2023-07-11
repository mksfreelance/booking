import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const PriceRanges = {
  ANY: {
    minPrice: 0,
    maxPrice: 100000,
  },
  LOW: {
    minPrice: 0,
    maxPrice: 10000,
  },
  MIDDLE: {
    minPrice: 10001,
    maxPrice: 50000,
  },
  HIGH: {
    minPrice: 50001,
    maxPrice: 100000,
  },
};

const houseTypeSelect = document.querySelector('select[name="housing-type"]');
const roomsSelect = document.querySelector('select[name="housing-rooms"]');
const guestsSelect = document.querySelector('select[name="housing-guests"]');

const filterByHouseType = (type) => houseTypeSelect.value === type || houseTypeSelect.value === DEFAULT_VALUE;

const filterByPrice = (price) => {
  const priseSelect = document.querySelector('select[name="housing-price"]').value.toUpperCase();
  return price >= PriceRanges[priseSelect].minPrice && price <= PriceRanges[priseSelect].maxPrice;
};

const filterByRoomsCount = (roomsCount) => Number(roomsSelect.value) === roomsCount || roomsSelect.value === DEFAULT_VALUE;
const filterByGuestsCount = (guestsCount) => Number(guestsSelect.value) === guestsCount || guestsSelect.value === DEFAULT_VALUE;

const filterByFeatures = (features) => {
  const checkBoxFeatures = document.querySelectorAll('.map__features :checked');
  if (checkBoxFeatures.length && features) {
    return Array.from(checkBoxFeatures).every((checkFeatures) => features.includes(checkFeatures.value));
  }
  return checkBoxFeatures.length === 0;
};

const filterOffer = (offers, rerenderMarkers) => {

  const filteredOffers = offers.filter(({ offer }) =>
    filterByHouseType(offer.type) &&
    filterByPrice(offer.price) &&
    filterByRoomsCount(offer.rooms) &&
    filterByGuestsCount(offer.guests) &&
    filterByFeatures(offer.features)
  );
  rerenderMarkers(filteredOffers.slice(0, 10));
};


const initFilters = (offers) => {
  const onFilterChange = debounce(() => filterOffer(offers, renderMarkers), RERENDER_DELAY);
  document.querySelector('.map__filters').addEventListener('change', onFilterChange);
};

export { initFilters };
