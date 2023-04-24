import { ChangeEvent } from 'react';
import { CATEGORY, CameraLevel, CameraType, Category, DEBOUNCE_DELAY, LEVEL, PRICE_FROM, PRICE_TO, START_PAGE, TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getFromPrice, getMaximumPrice, getMinimalPrice } from '../../store/ui/selectors';
import { changePage, clearFilters, setCameraLevel, setCameraType, setCategory, setPriceFrom, setPriceTo } from '../../store/ui/ui';
import { debounce } from 'ts-debounce';
import { useSearchParams } from 'react-router-dom';

function FilterForm(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(getCurrentPage);
  const minimalPrice = useAppSelector(getMinimalPrice);
  const maximumPrice = useAppSelector(getMaximumPrice);
  const priceFrom = useAppSelector(getFromPrice);

  const priceGte = searchParams.get(PRICE_FROM);
  const priceLte = searchParams.get(PRICE_TO);

  const goOnStartPage = () => {
    if (currentPage !== START_PAGE) {
      dispatch(changePage({ page: START_PAGE }));
    }
  };

  const handleLevelInputChange = (levelData: CameraLevel) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCameraLevel({ cameraLevel: levelData }));
    goOnStartPage();
    setSearchParams(() => {
      if (evt.target.checked) {
        searchParams.append(levelData, LEVEL);
      } else {
        searchParams.delete(levelData);
      }

      return searchParams;
    });
  };

  const handleTypeInputChange = (typeData: CameraType) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCameraType({ cameraType: typeData }));
    goOnStartPage();
    setSearchParams(() => {
      if (evt.target.checked) {
        searchParams.append(typeData, TYPE);
      } else {
        searchParams.delete(typeData);
      }

      return searchParams;
    });
  };

  const handleCategoryInputChange = (categoryData: Category) => (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory({ category: categoryData }));
    goOnStartPage();
    setSearchParams(() => {
      if (evt.target.checked) {
        searchParams.append(categoryData, CATEGORY);
      } else {
        searchParams.delete(categoryData);
      }

      return searchParams;
    });
  };

  const handlePriceFromInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = Number(evt.target.value);

    if (price < minimalPrice) {
      evt.target.value = String(minimalPrice);
      price = minimalPrice;
    }

    setSearchParams(() => {
      searchParams.set(PRICE_FROM, String(price));

      return searchParams;
    });

    dispatch(setPriceFrom({ priceFrom: price }));
    goOnStartPage();
  };

  const debouncedPriceFromInputHandler = debounce(handlePriceFromInputChange, DEBOUNCE_DELAY);

  const handlePriceToInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = Number(evt.target.value);

    if (price < 0) {
      evt.target.value = '';
      return;
    }

    if (price < minimalPrice || (priceFrom && price < priceFrom)) {
      evt.target.value = '';
      return;
    }

    if (price > maximumPrice) {
      evt.target.value = String(maximumPrice);
      price = maximumPrice;
    }

    setSearchParams(() => {
      searchParams.set(PRICE_TO, String(price));

      return searchParams;
    });

    dispatch(setPriceTo({ priceTo: price }));
    goOnStartPage();
  };

  const debouncedPriceToInputHandler = debounce(handlePriceToInputChange, DEBOUNCE_DELAY);

  const handleResetBtnClick = () => {
    dispatch(clearFilters());
    setSearchParams(() => {
      searchParams.delete(PRICE_FROM);
      searchParams.delete(PRICE_TO);
      Object.values(Category).forEach((value) => searchParams.delete(value));
      Object.values(CameraLevel).forEach((value) => searchParams.delete(value));
      Object.values(CameraType).forEach((value) => searchParams.delete(value));

      return searchParams;
    });
  };

  let fromPlaceholder = 'от';
  let upPlaceholder = 'до';

  if (priceLte) {
    upPlaceholder = priceLte;
  }

  if (!priceLte && maximumPrice) {
    upPlaceholder = String(maximumPrice);
  }

  if (priceGte) {
    fromPlaceholder = priceGte;
  }

  if (!priceGte && minimalPrice) {
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
                checked={searchParams.get(value) !== null}
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
                checked={searchParams.get(value) !== null}
                disabled={searchParams.get(Category.Videocamera) !== null && (value === CameraType.Film || value === CameraType.Snapshot)}
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
                checked={searchParams.get(value) !== null}
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
