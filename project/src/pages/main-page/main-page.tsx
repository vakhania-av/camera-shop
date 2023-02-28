import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import FilterForm from '../../components/filter-form/filter-form';
import Layout from '../../components/layout/layout';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import SortingForm from '../../components/sorting-form/sorting-form';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras/selectors';

function MainPage(): JSX.Element {
  const cameras = useAppSelector(getCameras);

  return (
    <Layout>
      <main>
        <Banner />
        <div className='page-content'>
          <Breadcrumbs />
          <section className='catalog'>
            <div className='container'>
              <h1 className='title title--h2'>Каталог фото- и видеотехники</h1>
              <div className='page-content__columns'>
                <div className='catalog__aside'>
                  <div className='catalog-filter'>
                    <FilterForm />
                  </div>
                </div>
                <div className='catalog__content'>
                  <div className='catalog-sort'>
                    <SortingForm />
                  </div>
                  <div className='cards catalog__cards'>
                    {cameras.map((camera) => (
                      <ProductCard key={camera.id} camera={camera} />
                    ))}
                  </div>
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default MainPage;
