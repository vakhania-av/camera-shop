import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { fetchCamerasPerPageAction, fetchCurrentCameraAction, fetchPromoAction, fetchReviewsAction, fetchSimilarCamerasAction, postReviewAction } from './api-actions';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeNewReview, makeFakePastReview, makeFakePromo, makeFutureReview } from '../utils/mock';
import { APIRoute, CameraLevel, CameraType, Category, OrderData, SortData } from '../const';
import { setPagesCount } from './ui/ui';

describe('Async actions:', () => {
  const api = createAPI();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch LOAD_PROMO when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockApi
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch LOAD_CURRENT_CAMERA when GET /cameras/id', async () => {
    const mockCamera = makeFakeCamera();
    const mockId = '2';
    mockApi
      .onGet(`${APIRoute.Cameras}/${mockId}`)
      .reply(200, mockCamera);

    const store = mockStore();

    await store.dispatch(fetchCurrentCameraAction(mockId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCurrentCameraAction.pending.type,
      fetchCurrentCameraAction.fulfilled.type
    ]);
  });

  it('should dispatch LOAD_SIMILAR_CAMERAS when GET /cameras/id/similar',
    async () => {
      const mockSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockId = '2';

      mockApi
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Similar}`)
        .reply(200, mockSimilarCameras);

      const store = mockStore();

      await store.dispatch(fetchSimilarCamerasAction(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchSimilarCamerasAction.pending.type,
        fetchSimilarCamerasAction.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_REVIEWS when GET /cameras/id/reviews',
    async () => {
      const mockReviews = [makeFakePastReview(), makeFakePastReview(), makeFakePastReview()];
      const mockId = '2';

      mockApi
        .onGet(`${APIRoute.Cameras}/${mockId}${APIRoute.Reviews}`)
        .reply(200, mockReviews);

      const store = mockStore();

      await store.dispatch(fetchReviewsAction(mockId));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_CAMERAS_PER_PAGE when GET /cameras?_start=start&_limit=limit',
    async () => {
      const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockStart = 0;
      const mockLimit = 3;

      mockApi
        .onGet(`${APIRoute.Cameras}?_start=${mockStart}&_limit=${mockLimit}`)
        .reply(200,
          mockCameras,
          {'x-total-count': 40}
        );

      const store = mockStore();

      await store.dispatch(fetchCamerasPerPageAction({start: mockStart, limit: mockLimit}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCamerasPerPageAction.pending.type,
        setPagesCount.type,
        fetchCamerasPerPageAction.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_CAMERAS_PER_PAGE when GET /cameras?_start=start&_limit=limit&_sort=sortOptions&_order=orderOptions',
    async () => {
      const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockStart = 0;
      const mockLimit = 3;
      const mockSortOptions = SortData.Price;
      const mockOrderOptions = OrderData.Ascending;

      mockApi
        .onGet(`${APIRoute.Cameras}?_start=${mockStart}&_limit=${mockLimit}&_sort=${mockSortOptions}&_order=${mockOrderOptions}`)
        .reply(200,
          mockCameras,
          {'x-total-count': 40}
        );

      const store = mockStore();

      await store.dispatch(fetchCamerasPerPageAction({start: mockStart, limit: mockLimit, sort: mockSortOptions, order: mockOrderOptions}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCamerasPerPageAction.pending.type,
        setPagesCount.type,
        fetchCamerasPerPageAction.fulfilled.type
      ]);
    });

  it('should dispatch LOAD_CAMERAS_PER_PAGE when start, limit, sort, order,type, level, category, min and max price',
    async () => {
      const mockCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];
      const mockStart = 0;
      const mockLimit = 3;
      const mockSortOptions = SortData.Price;
      const mockOrderOptions = OrderData.Ascending;
      const mockTypeOptions = CameraType.Collection;
      const mockLevelOptions = CameraLevel.NonProfessional;
      const mockCategoryOptions = Category.Photocamera;
      const mockMinPrice = 200;
      const mockMaxPrice = 100000;

      mockApi
        .onGet(`${APIRoute.Cameras}?_start=${mockStart}&_limit=${mockLimit}&_sort=${mockSortOptions}&_order=${mockOrderOptions}&category=${mockCategoryOptions}&type=${mockTypeOptions}&level=${mockLevelOptions}&price_gte=${mockMinPrice}&price_lte=${mockMaxPrice}`)
        .reply(200,
          mockCameras,
          {'x-total-count': 40}
        );

      const store = mockStore();

      await store.dispatch(fetchCamerasPerPageAction({start: mockStart, limit: mockLimit, sort: mockSortOptions, order: mockOrderOptions, categories: [mockCategoryOptions], types: [mockTypeOptions], levels: [mockLevelOptions], priceFrom: mockMinPrice, priceTo: mockMaxPrice}));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        fetchCamerasPerPageAction.pending.type,
        setPagesCount.type,
        fetchCamerasPerPageAction.fulfilled.type
      ]);
    });

  it('should dispatch POST_REVIEW when POST /reviews',
    async () => {
      const mockReview = makeFakeNewReview();
      const mockReply = makeFutureReview();

      mockApi
        .onPost(APIRoute.Reviews)
        .reply(200, mockReply);

      const store = mockStore();

      await store.dispatch(postReviewAction(mockReview));

      const actions = store.getActions().map(({type}) => type);

      expect(actions).toEqual([
        postReviewAction.pending.type,
        postReviewAction.fulfilled.type
      ]);
    });
});
