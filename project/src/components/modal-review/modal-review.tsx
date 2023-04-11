import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ReviewPost } from '../../types/review';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviewModalStatus } from '../../store/modals/selectors';
import { selectPostReviewStatus } from '../../store/reviews/selectors';
import { Fragment, useEffect } from 'react';
import { closeReviewModal, openReviewSuccessModal } from '../../store/modals/modals';
import classNames from 'classnames';
import { MODAL_OPEN_CLASS } from '../../const';
import { postReviewAction } from '../../store/api-actions';
import FocusTrap from 'focus-trap-react';
import Spinner from '../spinner/spinner';
import { clearPostReviewStatus } from '../../store/reviews/reviews';

const RateFormData = {
  Great: { id: 'star-5', title: 'Отлично', value: 5 },
  Good: { id: 'star-4', title: 'Хорошо', value: 4 },
  Normal: { id: 'star-3', title: 'Нормально', value: 3 },
  Bad: { id: 'star-2', title: 'Плохо', value: 2 },
  Horrible: { id: 'star-1', title: 'Ужасно', value: 1 },
} as const;

const FormData = {
  UserName: {
    label: 'Ваше имя',
    name: 'userName',
    placeholder: 'Введите ваше имя',
    error: 'Нужно указать имя',
  },
  Advantages: {
    label: 'Достоинства',
    name: 'advantage',
    placeholder: 'Основные преимущества товара',
    error: 'Нужно указать достоинства',
  },
  Disadvantages: {
    label: 'Недостатки',
    name: 'disadvantage',
    placeholder: 'Главные недостатки товара',
    error: 'Нужно указать недостатки',
  },
} as const;

function ModalReview(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit } = useForm<ReviewPost>();

  const isActive = useAppSelector(getReviewModalStatus);
  const { isSuccess, isLoading } = useAppSelector(selectPostReviewStatus);

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeReviewModal());
      dispatch(openReviewSuccessModal());
    }

    return () => {
      dispatch(clearPostReviewStatus());
    };
  }, [isSuccess, dispatch]);

  const textareaClassName = classNames('custom-textarea form-review__item', {
    'is-invalid': errors.review,
  });

  const handleEscKeydownEvent = (evt: KeyboardEvent) => {
    if (evt.code === 'Escape' && isActive) {
      dispatch(closeReviewModal);
    }
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

  const modalClass = classNames('modal', { 'is-active': isActive });

  const handleCloseBtnClick = () => {
    dispatch(closeReviewModal());
  };

  const onSubmit: SubmitHandler<ReviewPost> = (review) => {
    if (id) {
      const payload = { ...review, cameraId: Number(id), rating: Number(review.rating) };
      dispatch(postReviewAction({ ...payload }));
    }
  };

  return (
    <FocusTrap active={isActive} focusTrapOptions={{tabbableOptions: {displayCheck: 'none'}}}>
      <div
        className={modalClass}
        onClick={handleCloseBtnClick}
        data-testid="modal"
      >
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content" onClick={(evt) => evt.stopPropagation()}>
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form
                method="post"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">
                      Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        {Object.values(RateFormData).map((rate) => (
                          <Fragment key={rate.id}>
                            <input
                              className="visually-hidden"
                              id={rate.id}
                              type="radio"
                              value={rate.value}
                              {...register('rating', { required: true })}
                            />
                            <label
                              className="rate__label"
                              htmlFor={rate.id}
                              title={rate.title}
                            >
                            </label>
                          </Fragment>
                        ))}
                      </div>
                      <div className="rate__progress">
                        <span className="rate__stars">0</span>
                        <span>/</span>
                        <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    {errors.rating?.type === 'required' && (
                      <p className="rate__message">Нужно оценить товар</p>
                    )}
                  </fieldset>
                  {Object.values(FormData).map((data) => {
                    const className = classNames(
                      'custom-input form-review__item',
                      {
                        'is-invalid': errors[data.name],
                      }
                    );

                    return (
                      <div className={className} key={data.name}>
                        <label>
                          <span className="custom-input__label">
                            {data.label}
                            <svg width="9" height="9" aria-hidden="true">
                              <use xlinkHref="#icon-snowflake" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            placeholder={data.placeholder}
                            {...register(data.name, { required: true })}
                            data-testid={data.name}
                          />
                        </label>
                        {errors[data.name]?.type === 'required' && (
                          <p className="custom-input__error">{data.error}</p>
                        )}
                      </div>
                    );
                  })}
                  <div className={textareaClassName}>
                    <label>
                      <span className="custom-textarea__label">
                        Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake" />
                        </svg>
                      </span>
                      <textarea
                        placeholder="Поделитесь своим опытом покупки"
                        {...register('review', {
                          required: true,
                          minLength: 5,
                        })}
                        data-testid="review"
                      >
                      </textarea>
                    </label>
                    {errors.review && (
                      <div className="custom-textarea__error">
                        Нужно добавить комментарий
                      </div>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn--purple form-review__btn"
                  type="submit"
                >
                  { isLoading ? <Spinner size='small' color='white' /> : 'Отправить отзыв' }
                </button>
              </form>
            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={handleCloseBtnClick}
              disabled={isLoading}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default ModalReview;
