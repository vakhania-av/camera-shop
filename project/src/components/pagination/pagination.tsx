import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getPagesCount } from '../../store/ui/selectors';
import { changePage } from '../../store/ui/ui';
import classnames from 'classnames';

function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();

  const pages = [];

  const pagesCount = useAppSelector(getPagesCount);
  const currentPage = useAppSelector(getCurrentPage);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handlePageClick = (page: number) => {
    dispatch(changePage({ page }));
  };

  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        {previousPage >= 1 && (
          <li className='pagination__item'>
            <Link
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {
                page: String(previousPage),
              })}`}
              className='pagination__link pagination__link--text'
              onClick={() => handlePageClick(previousPage)}
            >
              Назад
            </Link>
          </li>
        )}

        {pages.map((page) => {
          const className = classnames('pagination__link', {
            'pagination__link--active': page === currentPage,
          });

          return (
            <li key={page} className='pagination__item'>
              <Link
                to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {
                  page: String(page),
                })}`}
                className={className}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {nextPage <= pagesCount && (
          <li className='pagination__item'>
            <Link
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, {
                page: String(nextPage),
              })}`}
              className='pagination__link pagination__link--text'
              onClick={() => handlePageClick(nextPage)}
            >
              Далее
            </Link>
          </li>
        )}

        <li className='pagination__item'>
          <a className='pagination__link pagination__link--active' href='1'>
            1
          </a>
        </li>

        <li className='pagination__item'>
          <a className='pagination__link pagination__link--text' href='2'>
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
