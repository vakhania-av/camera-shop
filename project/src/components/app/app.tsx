import BasketPage from '../../pages/basket-page/basket-page';
import ProductPage from '../../pages/product-page/product-page';
import MainPage from '../../pages/main-page/main-page';

import { AppRoute } from '../../const';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<MainPage />} />
            <Route path={AppRoute.Basket} element={<BasketPage />} />
            <Route path={AppRoute.Camera}>
              <Route path={AppRoute.Product} element={<ProductPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
