import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, TOTAL_COUNT_HEADER } from '../const';
import { Camera, CamerasParams, Promo } from '../types/camera';
import { Review, ReviewPost } from '../types/review';
import { AppDispatch, State } from '../types/state';
import { setMinAndMaxPrice, setPagesCount } from './ui/ui';

export const fetchCamerasPerPageAction = createAsyncThunk<
  Camera[],
  CamerasParams,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchCamerasPerPage',
  async (
    {
      start,
      limit,
      sort,
      order,
      categories,
      types,
      levels,
      priceFrom,
      priceTo,
    },
    { dispatch, extra: api, rejectWithValue }
  ) => {
    try {
      const optionsData = {
        sortOptions: sort ? `&_sort=${sort}` : '',
        orderOptions: order ? `&_order=${order}` : '',
        categoryOptions: categories
          ? categories.map((category) => `&category=${category}`).join('')
          : '',
        typeOptions: types ? types.map((type) => `&type=${type}`).join('') : '',
        levelOptions: levels
          ? levels.map((level) => `&level=${level}`).join('')
          : '',
        priceFromOptions: priceFrom ? `&price_gte=${priceFrom}` : '',
        priceToOptions: priceTo ? `price_lte=${priceTo}` : '',
      };

      const {
        sortOptions,
        orderOptions,
        categoryOptions,
        typeOptions,
        levelOptions,
        priceFromOptions,
        priceToOptions,
      } = optionsData;

      const { data, headers } = await api.get<Camera[]>(
        `${APIRoute.Cameras}?_start=${start}&_limit=${limit}${sortOptions}${orderOptions}${categoryOptions}${typeOptions}${levelOptions}${priceFromOptions}${priceToOptions}`
      );
      const camerasCount = Number(headers[TOTAL_COUNT_HEADER]);

      dispatch(setPagesCount({ camerasCount }));

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCameras = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCameras', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Camera[]>(APIRoute.Cameras);

  dispatch(setMinAndMaxPrice({ cameras: data }));
});

export const fetchPromoAction = createAsyncThunk<
  Promo,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromo', async (_arg, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<Promo>(APIRoute.Promo);

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchCurrentCameraAction = createAsyncThunk<
  Camera,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCurrentCamera', async (id, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${id}`);

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchSimilarCamerasAction = createAsyncThunk<
  Camera[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarCameras', async (id, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<Camera[]>(
      `${APIRoute.Cameras}/${id}${APIRoute.Similar}`
    );

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchReviewsAction = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async (id, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.get<Review[]>(
      `${APIRoute.Cameras}/${id}${APIRoute.Reviews}`
    );

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const postReviewAction = createAsyncThunk<
  Review | undefined,
  ReviewPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('reviews/postReview', async (review, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post<Review>(APIRoute.Reviews, review);

    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchSearchCamerasAction = createAsyncThunk<
  Camera[] | undefined,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'cameras/searchCameras',
  async (searchPhrase, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Camera[]>(
        `${APIRoute.Cameras}?name_like=${searchPhrase}`
      );

      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
