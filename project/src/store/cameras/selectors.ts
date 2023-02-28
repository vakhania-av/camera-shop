import { createSelector } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Camera, Promo } from '../../types/camera';
import { State } from '../../types/state';

// Cameras
export const getCameras = (state: State): Camera[] => state[NameSpace.Camera].cameras;
export const getCamerasFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchCamerasStatus;

// Promo
export const getPromo = (state:State): Promo | null => state[NameSpace.Camera].promo;
export const getPromoFetchStatus = (state: State): FetchStatus => state[NameSpace.Camera].fetchPromoStatus;

// Selectors
export const selectPromoStatus = createSelector(
  [getPromoFetchStatus],
  (status) => ({
    isLoading: [FetchStatus.Idle, FetchStatus.Pending].includes(status),
    isSuccess: status === FetchStatus.Success,
    isError: status === FetchStatus.Error,
  })
);
