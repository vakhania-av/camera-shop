import { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import ModalAddCart from '../../components/modal-add-cart/modal-add-cart';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SortingForm from '../../components/sorting-form/sorting-form';
import { CAMERAS_PER_PAGE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamerasPerPageAction } from '../../store/api-actions';
import { getCamerasOnPage } from '../../store/cameras/selectors';
import { getCurrentPage } from '../../store/ui/selectors';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasOnPage = useAppSelector(getCamerasOnPage);
  const currentPage = useAppSelector(getCurrentPage);

  useEffect(() => {
    window.scrollTo(0, 0);
    const startIndex = (currentPage - 1) * CAMERAS_PER_PAGE;
    dispatch(fetchCamerasPerPageAction([startIndex, CAMERAS_PER_PAGE]));
  }, [currentPage, dispatch]);

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
                    <div className="cards catalog__cards">
                      {camerasOnPage.map((camera) => (
                        <ProductCard key={camera.id} camera={camera} />
                      ))}
                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
          <ModalAddCart />
        </main>
      </Layout>
    </div>
  );
}

export default MainPage;
