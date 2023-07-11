const GET_OFFERS_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const SEND_OFFER_URL = 'https://26.javascript.pages.academy/keksobooking';

const fetchOffers = (onLoad, onSuccess, onError) => {
  fetch(GET_OFFERS_URL)
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then(onLoad)
    .catch((error) => onError(error));
};

const onSubmitFormButtonClick = (body, onSuccess, onError) => {
  fetch(
    SEND_OFFER_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch((error) => {
      onError(error);
    });
};
export { fetchOffers, onSubmitFormButtonClick };
