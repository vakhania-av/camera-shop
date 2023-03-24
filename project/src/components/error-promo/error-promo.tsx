import styles from './error-promo.module.css';

function ErrorPromo(): JSX.Element {
  return (
    <div className={`banner ${styles.banner}`}>
      <p className="banner__info">
        <span className="banner__text">
          Ошибка загрузки промо! <br /> Обновите страницу!
        </span>
      </p>
    </div>
  );
}

export default ErrorPromo;
