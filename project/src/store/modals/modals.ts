import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Camera } from '../../types/camera';

type Modals = {
  activeCamera: Camera | null;
  isAddToCartOpen: boolean;
};

const initialState: Modals = {
  activeCamera: null,
  isAddToCartOpen: false,
};

export const modals = createSlice({
  name: NameSpace.Modals,
  initialState,
  reducers: {
    openAddToCartModal: (state) => {
      state.isAddToCartOpen = true;
    },
    closeAddToCartModal: (state) => {
      state.isAddToCartOpen = false;
    },
    setActiveCamera: (state, action: PayloadAction<{ camera: Camera }>) => {
      state.activeCamera = action.payload.camera;
    },
    clearActiveCamera: (state) => {
      state.activeCamera = null;
    },
  },
});

export const {
  setActiveCamera,
  clearActiveCamera,
  openAddToCartModal,
  closeAddToCartModal,
} = modals.actions;
