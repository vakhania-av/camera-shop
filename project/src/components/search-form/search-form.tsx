import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSearchCamerasAction } from '../../store/api-actions';
import { clearSearchCameras } from '../../store/cameras/cameras';
import { getSearchCameras } from '../../store/cameras/selectors';

function SearchForm(): JSX.Element {
  const [searchPhrase, setSearchPhrase] = useState('');

  const dispatch = useAppDispatch();
  const searchCamerasList = useAppSelector(getSearchCameras);

  useEffect(() => {
    searchPhrase.length ? dispatch(fetchSearchCamerasAction(searchPhrase)) : dispatch(clearSearchCameras());
  }, [searchPhrase, dispatch]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchPhrase(evt.target.value);
  };

  const handleResetBtnClick = () => {
    setSearchPhrase('');
  };

  return (
    <>
      <form>
        <label>
          <svg
            className='form-search__icon'
            width='16'
            height='16'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-lens'></use>
          </svg>
          <input
            className='form-search__input'
            type='text'
            autoComplete='off'
            placeholder='Поиск по сайту'
            value={searchPhrase}
            onChange={handleInputChange}
          />
        </label>
        <ul
          className='form-search__select-list'
          style={
            searchPhrase.length ? { visibility: 'visible', opacity: '1' } : {}
          }
        >
          {searchCamerasList && searchCamerasList.length ? (
            searchCamerasList.map((camera) => (
              <li
                className='form-search__select-item'
                tabIndex={0}
                key={camera.id}
              >
                {' '}
                {camera.name}
              </li>
            ))
          ) : (
            <li className='form-search__select-item' tabIndex={0}>
              Ничего не удалось найти
            </li>
          )}
        </ul>
      </form>
      <button
        style={searchPhrase.length ? { display: 'inline-block' } : {}}
        className='form-search__reset'
        type='reset'
        onClick={handleResetBtnClick}
      >
        <svg width='10' height='10' aria-hidden='true'>
          <use xlinkHref='#icon-close'></use>
        </svg>
        <span className='visually-hidden'>Сбросить поиск</span>
      </button>
    </>
  );
}

export default SearchForm;
