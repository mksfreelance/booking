const sliderElement = document.querySelector('.ad-form__slider');
const handlePriceInput = document.querySelector('#price');

const updateSliderOptions = (min) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: Number(min),
      max: 100000,
    },
    step: 1
  });
  sliderElement.noUiSlider.set(min);
};

const onSliderMove = () => {
  sliderElement.noUiSlider.set(handlePriceInput.value);
};

const activateSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: Number(handlePriceInput.min),
      max: Number(handlePriceInput.max),
    },
    start: Number(handlePriceInput.min),
    step: 100,
    connect: 'lower',
    format: {
      to: (value) => {
        if (!Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(0);
      },
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('slide', () => {
    handlePriceInput.value = sliderElement.noUiSlider.get();
  });

  handlePriceInput.addEventListener('input', onSliderMove);
};

export { activateSlider, updateSliderOptions };
