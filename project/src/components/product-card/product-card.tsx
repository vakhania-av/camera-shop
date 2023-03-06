import { nanoid } from 'nanoid';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../../const';
import { useAppDispatch } from '../../hooks';
import { openAddToCartModal, setActiveCamera } from '../../store/modals/modals';
import { Camera } from '../../types/camera';
import IconStar from '../icon-star/icon-star';

type ProductCardProps = {
  camera: Camera;
};

function ProductCard({ camera }: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const fullStars = Array(camera.rating).fill(<IconStar full />);
  const emptyStars = Array(MAX_RATING - camera.rating).fill(<IconStar />);

  const handleToBuyBtnClick = () => {
    dispatch(setActiveCamera({ camera }));
    dispatch(openAddToCartModal());
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${camera.previewImg}`}
            srcSet={`/${camera.previewImgWebp2x} 2x`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {fullStars.map(() => {
            const key = nanoid();

            return <IconStar key={key} full />;
          })}

          {emptyStars.map(() => {
            const key = nanoid();

            return <IconStar key={key} />;
          })}
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {camera.reviewCount}
          </p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${camera.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleToBuyBtnClick}
        >
          Купить
        </button>
        <Link to={`${AppRoute.Root}${generatePath(AppRoute.Product, { id: String(camera.id) })}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
