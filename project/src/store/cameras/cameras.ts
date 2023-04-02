import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { fetchCamerasPerPageAction, fetchCurrentCameraAction, fetchPromoAction, fetchSearchCamerasAction, fetchSimilarCamerasAction } from '../api-actions';

type Cameras = {
  camerasOnPage: Camera[];
  currentCamera: Camera | null;
  similarCameras: Camera[];
  searchCameras: Camera[] | undefined;
  promo: Promo | null;
  fetchCamerasStatus: FetchStatus;
  fetchPromoStatus: FetchStatus;
  fetchCurrentCameraStatus: FetchStatus;
  fetchSimilarCamerasStatus: FetchStatus;
  fetchSearchCamerasStatus: FetchStatus;
};

const initialState: Cameras = {
  camerasOnPage: [],
  currentCamera: null,
  similarCameras: [],
  searchCameras: [],
  promo: null,
  fetchCamerasStatus: FetchStatus.Idle,
  fetchPromoStatus: FetchStatus.Idle,
  fetchCurrentCameraStatus: FetchStatus.Idle,
  fetchSimilarCamerasStatus: FetchStatus.Idle,
  fetchSearchCamerasStatus: FetchStatus.Idle
};

export const cameras = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {
    clearSearchCameras: (state) => {
      state.searchCameras = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.fetchPromoStatus = FetchStatus.Pending;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.fetchPromoStatus = FetchStatus.Success;
        state.promo = action.payload;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.fetchPromoStatus = FetchStatus.Error;
      })
      .addCase(fetchCamerasPerPageAction.fulfilled, (state, action) => {
        state.fetchCamerasStatus = FetchStatus.Success;
        state.camerasOnPage = action.payload;
      })
      .addCase(fetchCamerasPerPageAction.pending, (state) => {
        state.fetchCamerasStatus = FetchStatus.Pending;
      })
      .addCase(fetchCamerasPerPageAction.rejected, (state) => {
        state.fetchCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchCurrentCameraAction.fulfilled, (state, action) => {
        state.fetchCurrentCameraStatus = FetchStatus.Success;
        state.currentCamera = action.payload;
      })
      .addCase(fetchCurrentCameraAction.rejected, (state) => {
        state.fetchCurrentCameraStatus = FetchStatus.Error;
      })
      .addCase(fetchCurrentCameraAction.pending, (state) => {
        state.fetchCurrentCameraStatus = FetchStatus.Pending;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Success;
        state.similarCameras = action.payload;
      })
      .addCase(fetchSimilarCamerasAction.rejected, (state) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchSimilarCamerasAction.pending, (state) => {
        state.fetchSimilarCamerasStatus = FetchStatus.Pending;
      })
      .addCase(fetchSearchCamerasAction.fulfilled, (state, action) => {
        state.fetchSearchCamerasStatus = FetchStatus.Success;
        state.searchCameras = action.payload;
      })
      .addCase(fetchSearchCamerasAction.rejected, (state) => {
        state.fetchSearchCamerasStatus = FetchStatus.Error;
      })
      .addCase(fetchSearchCamerasAction.pending, (state) => {
        state.fetchSearchCamerasStatus = FetchStatus.Pending;
      });
  },
});

export const { clearSearchCameras } = cameras.actions;
