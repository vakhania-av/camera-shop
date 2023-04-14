import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import browserHistory from './browser-history';
import App from './components/app/app';
import HistoryRouter from './components/history-router/history-router';
import { CAMERAS_PER_PAGE } from './const';
import { store } from './store';
import { fetchPromoAction, fetchCamerasPerPageAction, fetchCameras } from './store/api-actions';
import { CamerasParams } from './types/camera';

const camerasParams: CamerasParams = {
  start: 0,
  limit: CAMERAS_PER_PAGE
};

store.dispatch(fetchCamerasPerPageAction(camerasParams));
store.dispatch(fetchCameras());
store.dispatch(fetchPromoAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
