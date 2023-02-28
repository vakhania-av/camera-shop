function ErrorPromo(): JSX.Element {
  return (
    <div className="banner" style={{ backgroundColor: 'black' }}>
      <p className="banner__info">
        <span className="banner__text">
          Ошибка загрузки промо! <br /> Обновите страницу!
        </span>
      </p>
    </div>
  );
}

export default ErrorPromo;
