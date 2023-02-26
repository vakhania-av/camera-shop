import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  type: 'header' | 'footer';
};

const xLink = {
  header: '#icon-logo',
  footer: '#icon-logo-mono',
};

function Logo({ type }: LogoProps): JSX.Element {
  return (
    <Link
      to={AppRoute.Root}
      className={`${type}__logo`}
      aria-label='Переход на главную'
    >
      <svg width='100' height='36' aria-hidden='true'>
        <use xlinkHref={xLink[type]} />
      </svg>
    </Link>
  );
}

export default Logo;
