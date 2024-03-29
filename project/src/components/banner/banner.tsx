import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getPromo } from '../../store/cameras/selectors';
import ErrorPromo from '../error-promo/error-promo';

function Banner(): JSX.Element {
  const promo = useAppSelector(getPromo);

  if (!promo) {
    return <ErrorPromo />;
  }

  return (
    <div className='banner'>
      <picture>
        <source
          type='image/webp'
          srcSet={`/${promo.previewImgWebp}, /${promo.previewImgWebp2x} 2x`}
        />
        <img
          src={promo.previewImg}
          srcSet={`/${promo.previewImgWebp2x} 2x`}
          width='1280'
          height='280'
          alt='баннер'
        />
      </picture>
      <p className='banner__info'>
        <span className='banner__message'>Новинка!</span>
        <span className='title title--h1'>
          {promo.name}
        </span>
        <span className='banner__text'>
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link to={`${AppRoute.Root}${generatePath(AppRoute.Product, { id: String(promo.id) })}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
