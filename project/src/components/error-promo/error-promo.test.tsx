import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ErrorPromo from './error-promo';

describe('Component Error Banner:', () => {
  it('should render correctly', () => {
    render(
      <HelmetProvider>
        <BrowserRouter>
          <ErrorPromo />
        </BrowserRouter>
      </HelmetProvider>
    );

    const spanElement = screen.getByText(
      'Ошибка загрузки промо! Обновите страницу!'
    );

    expect(spanElement).toBeInTheDocument();
  });
});
