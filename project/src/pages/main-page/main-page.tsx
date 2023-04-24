import { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import FullpageSpinner from '../../components/fullpage-spinner/fullpage-spinner';
import Layout from '../../components/layout/layout';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import Pagination from '../../components/pagination/pagination';
import SortingForm from '../../components/sorting-form/sorting-form';
import { CAMERAS_PER_PAGE, CameraLevel, CameraType, Category, OrderData, PRICE_FROM, PRICE_TO, SortData } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasPerPageAction } from '../../store/api-actions';
import { getCamerasOnPage, selectCamerasStatus } from '../../store/cameras/selectors';
import { getAddToCartModalStatus } from '../../store/modals/selectors';
import { getCurrentPage } from '../../store/ui/selectors';
import ErrorScreen from '../error-screen/error-screen';
import { CamerasParams } from '../../types/camera';
import CardsList from '../../components/cards-list/cards-list';
import { useSearchParams } from 'react-router-dom';

function MainPage(): JSX.Element {
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const currentPage = useAppSelector(getCurrentPage);
  const isModalActive = useAppSelector(getAddToCartModalStatus);

  const { isError, isLoading } = useAppSelector(selectCamerasStatus);

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * CAMERAS_PER_PAGE;

    // Category
    const photocameraParam = searchParams.get(Category.Photocamera);
    const videocameraParam = searchParams.get(Category.Videocamera);

    const categoryParams = [photocameraParam, videocameraParam];
    const categories = Object.values(Category).reduce((acc: Category[], current, i) => {
      if (categoryParams[i]) {
        return [...acc, current];
      }

      return acc;
    }, []);

    // Level
    const nonProfessionalParam = searchParams.get(CameraLevel.NonProfessional);
    const professionalParam = searchParams.get(CameraLevel.Professional);
    const zeroParam = searchParams.get(CameraLevel.Zero);

    const levelsParams = [zeroParam, nonProfessionalParam, professionalParam];
    const levels = Object.values(CameraLevel).reduce((acc: CameraLevel[], current, i) => {
      if (levelsParams[i]) {
        return [...acc, current];
      }

      return acc;
    }, []);

    // Type
    const digitalParam = searchParams.get(CameraType.Digital);
    const filmParam = searchParams.get(CameraType.Film);
    const snapshotParam = searchParams.get(CameraType.Snapshot);
    const collectionParam = searchParams.get(CameraType.Collection);

    const typesParams = [digitalParam, filmParam, snapshotParam, collectionParam];
    const types = Object.values(CameraType).reduce((acc: CameraType[], current, i) => {
      if (typesParams[i]) {
        return [...acc, current];
      }

      return acc;
    }, []);

    let params: CamerasParams = {
      start: startIndex,
      limit: CAMERAS_PER_PAGE
    };

    if (searchParams.get('sort')) {
      params = {
        ...params,
        sort: searchParams.get('sort') === SortData.Price ? SortData.Price : SortData.Rating,
        order: searchParams.get('order') === OrderData.Ascending ? OrderData.Ascending : OrderData.Descending
      };
    }

    if (categories.length) {
      params = { ...params, categories };
    }

    if (levels.length) {
      params = { ...params, levels };
    }

    if (types.length) {
      params = { ...params, types };
    }

    if (searchParams.get(PRICE_FROM)) {
      params = { ...params, priceFrom: Number(searchParams.get(PRICE_FROM)) };
    }

    if (searchParams.get(PRICE_TO)) {
      params = { ...params, priceTo: Number(searchParams.get(PRICE_TO)) };
    }

    setSearchParams(searchParams);
    dispatch(fetchCamerasPerPageAction(params));

  }, [currentPage, dispatch, searchParams]);

  if (isLoading) {
    return <FullpageSpinner size='big' />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <div className="wrapper">
      <Layout>
        <main>
          <Banner />
          <div className="page-content">
            <Breadcrumbs />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">
                  Каталог фото- и видеотехники
                </h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <div className="catalog-filter">
                      <FilterForm />
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <SortingForm />
                    </div>
                    <CardsList cameras={camerasOnPage} />
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          { isModalActive && <ModalAddCart /> }
        </main>
      </Layout>
    </div>
  );
}

export default MainPage;
