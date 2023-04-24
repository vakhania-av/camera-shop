import { generatePath, Link, useSearchParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage, getPagesCount } from '../../store/ui/selectors';
import { changePage } from '../../store/ui/ui';
import classnames from 'classnames';

function Pagination(): JSX.Element {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const pagesCount = useAppSelector(getPagesCount);
  const currentPage = useAppSelector(getCurrentPage);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pages = [...Array(pagesCount).keys()].map((page) => page + 1);

  const handlePageClick = (page: number) => () => {
    dispatch(changePage({ page }));
  };

  return (
    <div className='pagination'>
      <ul className='pagination__list'>
        {previousPage >= 1 && (
          <li className='pagination__item'>
            <Link
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, { page: String(previousPage) })}?${searchParams.toString()}`}
              className='pagination__link pagination__link--text'
              onClick={handlePageClick(previousPage)}
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
                to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, { page: String(page) })}?${searchParams.toString()}`}
                className={className}
                onClick={handlePageClick(page)}
              >
                {page}
              </Link>
            </li>
          );
        })}

        {nextPage <= pagesCount && (
          <li className='pagination__item'>
            <Link
              to={`${AppRoute.Root}${generatePath(AppRoute.Catalog, { page: String(nextPage) })}?${searchParams.toString()}`}
              className='pagination__link pagination__link--text'
              onClick={handlePageClick(nextPage)}
            >
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
