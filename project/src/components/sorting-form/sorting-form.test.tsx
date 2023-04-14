import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import SortingForm from './sorting-form';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { NameSpace, OrderData, START_PAGE, SortData } from '../../const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<State, Action<string>, ThunkDispatch<State, typeof api, Action>>(middlewares);

const store = mockStore({
  [NameSpace.Ui]: {
    currentPage: START_PAGE,
    sort: SortData.Idle,
    order: OrderData.Idle
  }
});

const history = createMemoryHistory();

describe('Sorting form:', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HelmetProvider>
          <HistoryRouter history={history}>
            <SortingForm />
          </HistoryRouter>
        </HelmetProvider>
      </Provider>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
});
