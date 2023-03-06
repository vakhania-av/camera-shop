import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { fetchCamerasPerPageAction, fetchCurrentCameraAction, fetchPromoAction } from '../api-actions';

type Cameras = {
  camerasOnPage: Camera[];
  currentCamera: Camera | null;
  promo: Promo | null;
  fetchCamerasStatus: FetchStatus;
  fetchPromoStatus: FetchStatus;
  fetchCurrentCameraStatus: FetchStatus;
};

const initialState: Cameras = {
  camerasOnPage: [],
  currentCamera: null,
  promo: null,
  fetchCamerasStatus: FetchStatus.Idle,
  fetchPromoStatus: FetchStatus.Idle,
  fetchCurrentCameraStatus: FetchStatus.Idle
};

export const cameras = createSlice({
  name: NameSpace.Camera,
  initialState,
  reducers: {},
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
      });
  },
});
