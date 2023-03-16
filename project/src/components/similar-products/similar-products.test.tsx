import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { makeFakeCamera } from '../../utils/mock';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import SimilarProducts from './similar-products';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  [NameSpace.Modals]: {
    activeCamera: null,
    isAddToCartOpen: false,
  },
});

const fakeCameras = [
  makeFakeCamera(),
  makeFakeCamera(),
  makeFakeCamera(),
  makeFakeCamera(),
];

jest.mock('../icon-star/icon-star', () => () => 'Star');
jest.mock('nanoid', () => ({
  nanoid: jest.fn().mockImplementation(() => 'some-id'),
}));

const history = createMemoryHistory();

describe('Similar products', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarProducts cameras={fakeCameras} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[1].name)).toBeInTheDocument();
    expect(screen.getByText(fakeCameras[2].name)).toBeInTheDocument();
    expect(screen.queryByText(fakeCameras[3].name)).not.toBeInTheDocument();
  });
});
