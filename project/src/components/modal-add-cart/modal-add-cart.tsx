import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearActiveCamera, closeAddToCartModal } from '../../store/modals/modals';
import { getActiveProduct, getAddToCartModalStatus } from '../../store/modals/selectors';

import classnames from 'classnames';

import { useEffect } from 'react';
import { MODAL_OPEN_CLASS } from '../../const';

function ModalAddCart(): JSX.Element {
  const dispatch = useAppDispatch();

  const camera = useAppSelector(getActiveProduct);
  const isActive = useAppSelector(getAddToCartModalStatus);

  const closeModal = () => {
    dispatch(closeAddToCartModal());
    dispatch(clearActiveCamera());
  };

  const handleEscKeydownEvent = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape' && isActive) {
      closeModal();
    }
  };

  const handleCloseBtnClick = () => {
    closeModal();
  };

  const modalclassName = classnames('modal', { 'is-active': isActive });

  useEffect(() => {
    if (isActive) {
      document.body.classList.add(MODAL_OPEN_CLASS);
      document.addEventListener('keydown', handleEscKeydownEvent);
    }

    return () => {
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.removeEventListener('keydown', handleEscKeydownEvent);
    };
  });

  if (!camera) {
    return <p>Something went wrong...</p>;
  }

  const {
    name,
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    vendorCode,
    type,
    level,
    price,
  } = camera;

  return (
    <div className={modalclassName} onClick={handleCloseBtnClick}>
      <div className='modal__wrapper'>
        <div className='modal__overlay' />
        <div
          className='modal__content'
          onClick={(evt) => evt.stopPropagation()}
        >
          <p className='title title--h4'>Добавить товар в корзину</p>
          <div className='basket-item basket-item--short'>
            <div className='basket-item__img'>
              <picture>
                <source
                  type='image/webp'
                  srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width='140'
                  height='120'
                  alt={name}
                />
              </picture>
            </div>
            <div className='basket-item__description'>
              <p className='basket-item__title'>{name}</p>
              <ul className='basket-item__list'>
                <li className='basket-item__list-item'>
                  <span className='basket-item__article'>Артикул:</span>
                  <span className='basket-item__number'>{vendorCode}</span>
                </li>
                <li className='basket-item__list-item'>{`${type} фотокамера`}</li>
                <li className='basket-item__list-item'>{`${level} уровень`}</li>
              </ul>
              <p className='basket-item__price'>
                <span className='visually-hidden'>Цена:</span>
                {`${price} ₽`}
              </p>
            </div>
          </div>
          <div className='modal__buttons'>
            <button
              className='btn btn--purple modal__btn modal__btn--fit-width'
              type='button'
            >
              <svg width='24' height='16' aria-hidden='true'>
                <use xlinkHref='#icon-add-basket'></use>
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className='cross-btn'
            type='button'
            aria-label='Закрыть попап'
            onClick={handleCloseBtnClick}
          >
            <svg width='10' height='10' aria-hidden='true'>
              <use xlinkHref='#icon-close'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCart;
