import { ChangeEvent } from 'react';
import { CameraLevel, CameraType, Category, DEBOUNCE_DELAY, START_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraLevels, getCameraTypes, getCategories, getCurrentPage, getFromPrice, getMaximumPrice, getMinimalPrice, getToPrice } from '../../store/ui/selectors';
import { changePage, clearFilters, setCameraLevel, setCameraType, setCategory, setPriceFrom, setPriceTo } from '../../store/ui/ui';
import { debounce } from 'ts-debounce';

function FilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const levels = useAppSelector(getCameraLevels);
  const types = useAppSelector(getCameraTypes);
  const categories = useAppSelector(getCategories);
  const currentPage = useAppSelector(getCurrentPage);
  const minimalPrice = useAppSelector(getMinimalPrice);
  const maximumPrice = useAppSelector(getMaximumPrice);
  const priceFrom = useAppSelector(getFromPrice);
  const priceTo = useAppSelector(getToPrice);

  const goOnStartPage = () => {
    if (currentPage !== START_PAGE) {
      dispatch(changePage({ page: START_PAGE }));
    }
  };

  const handleLevelInputChange = (levelData: CameraLevel) => () => {
    dispatch(setCameraLevel({ cameraLevel: levelData }));
    goOnStartPage();
  };

  const handleTypeInputChange = (typeData: CameraType) => () => {
    dispatch(setCameraType({ cameraType: typeData }));
    goOnStartPage();
  };

  const handleCategoryInputChange = (categoryData: Category) => () => {
    dispatch(setCategory({ category: categoryData }));
    goOnStartPage();
  };

  const handlePriceFromInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = Number(evt.target.value);

    if (price < minimalPrice) {
      evt.target.value = String(minimalPrice);
      price = minimalPrice;
    }

    dispatch(setPriceFrom({ priceFrom: price }));
    goOnStartPage();
  };

  const debouncedPriceFromInputHandler = debounce(handlePriceFromInputChange, DEBOUNCE_DELAY);

  const handlePriceToInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = Number(evt.target.value);

    if (price < 0) {
      evt.target.value = '';
      return;
    }

    if (price < minimalPrice || (priceFrom && price < priceFrom)) {
      evt.target.value = '';
      return;
    }

    dispatch(setPriceTo({ priceTo: price }));
    goOnStartPage();
  };

  const debouncedPriceToInputHandler = debounce(handlePriceToInputChange, DEBOUNCE_DELAY);

  const handleResetBtnClick = () => {
    dispatch(clearFilters());
  };

  let fromPlaceholder = 'от';
  let upPlaceholder = 'до';

  if (priceTo) {
    upPlaceholder = String(priceTo);
  }

  if (!priceTo && maximumPrice) {
    upPlaceholder = String(maximumPrice);
  }

  if (priceFrom) {
    fromPlaceholder = String(priceFrom);
  }

  if (!priceFrom && minimalPrice) {
    fromPlaceholder = String(minimalPrice);
  }

  return (
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="price"
                placeholder={fromPlaceholder}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={debouncedPriceFromInputHandler}
              />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input
                type="number"
                name="priceUp"
                placeholder={upPlaceholder}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onChange={debouncedPriceToInputHandler}
              />
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Категория</legend>
        {Object.entries(Category).map(([name, value]) => (
          <div key={name} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleCategoryInputChange(value)}
                checked={categories.includes(value)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Тип камеры</legend>
        {Object.entries(CameraType).map(([name, value]) => (
          <div key={name} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleTypeInputChange(value)}
                checked={types.includes(value)}
                disabled={categories.includes(Category.Videocamera) && (value === CameraType.Film || value === CameraType.Snapshot)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Уровень</legend>
        {Object.entries(CameraLevel).map(([name, value]) => (
          <div key={name} className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name={name}
                onChange={handleLevelInputChange(value)}
                checked={levels.includes(value)}
              />
              <span className="custom-checkbox__icon"></span>
              <span className="custom-checkbox__label">{value}</span>
            </label>
          </div>
        ))}
      </fieldset>

      <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetBtnClick}>
        Сбросить фильтры
      </button>
    </form>
  );
}

export default FilterForm;
