import BasketPage from '../../pages/basket-page/basket-page';
import ProductPage from '../../pages/product-page/product-page';
import MainPage from '../../pages/main-page/main-page';

import { AppRoute } from '../../const';

import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../../pages/page-not-found/page-not-found';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Catalog} element={<MainPage />} />
          <Route path={AppRoute.Basket} element={<BasketPage />} />
          <Route path={AppRoute.Product} element={<ProductPage />} />
          <Route path={AppRoute.NotFound} element={<PageNotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
