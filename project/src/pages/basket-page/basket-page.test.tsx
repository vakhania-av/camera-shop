import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import BasketPage from './basket-page';

describe('Basket', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <BasketPage />
        </BrowserRouter>
      </HelmetProvider>
    );

    expect(screen.queryAllByText('Корзина')).toHaveLength(2);
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
  });
});
