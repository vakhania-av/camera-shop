import { useEffect } from 'react';
import { MODAL_OPEN_CLASS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeReviewSuccessModal } from '../../store/modals/modals';
import { getReviewSuccessModalStatus } from '../../store/modals/selectors';

import classNames from 'classnames';

function ModalReviewSuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const isActive = useAppSelector(getReviewSuccessModalStatus);

  const handleEscKeydownEvent = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape' && isActive) {
      dispatch(closeReviewSuccessModal());
    }
  };

  const handleCloseBtnClick = () => {
    dispatch(closeReviewSuccessModal());
  };

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

  const modalClass = classNames('modal modal--narrow', {
    'is-active': isActive,
  });

  return (
    <div className={modalClass} onClick={handleCloseBtnClick} data-testid='modal'>
      <div className='modal__wrapper'>
        <div className='modal__overlay'></div>
        <div
          className='modal__content'
          onClick={(evt) => evt.stopPropagation()}
        >
          <p className='title title--h4'>Спасибо за отзыв</p>
          <svg
            className='modal__icon'
            width='80'
            height='78'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-review-success' />
          </svg>
          <div className='modal__buttons'>
            <button
              className='btn btn--purple modal__btn modal__btn--fit-width'
              type='button'
              onClick={handleCloseBtnClick}
              data-testid='return'
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className='cross-btn'
            type='button'
            aria-label='Закрыть попап'
            onClick={handleCloseBtnClick}
          >
            <svg width='10' height='10' aria-hidden='true'>
              <use xlinkHref='#icon-close' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReviewSuccess;
