import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { State } from '../../types/state';

// Cameras
export const getCamerasFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchCamerasStatus;
export const getCamerasOnPage = (state: State): Camera[] => state[NameSpace.Camera].camerasOnPage;

// Promo
export const getPromo = (state:State): Promo | null => state[NameSpace.Camera].promo;
export const getPromoFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchPromoStatus;

// Product
export const getCurrentProduct = (state: State): Camera | null => state[NameSpace.Camera].currentCamera;
export const getCurrentProductFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchCurrentCameraStatus;

// Similar
export const getSimilarCameras = (state: State): Camera[] => state[NameSpace.Camera].similarCameras;
export const getSimilarCamerasFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchSimilarCamerasStatus;

// Selectors
export const selectPromoStatus = createSelector(
  [getPromoFetchStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error,
  })
);

export const selectCurrentProductStatus = createSelector(
  [getCurrentProductFetchStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error,
  })
);

export const selectSimilarCamerasStatus = createSelector(
  [getSimilarCamerasFetchStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error,
  })
);
