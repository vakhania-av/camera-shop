import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Review } from '../../types/review';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

type Reviews = {
  reviews: Review[];
  fetchReviewsStatus: FetchStatus;
  postReviewStatus: FetchStatus;
};

const initialState: Reviews = {
  reviews: [],
  fetchReviewsStatus: FetchStatus.Idle,
  postReviewStatus: FetchStatus.Idle
};

export const reviews = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    clearPostReviewStatus: (state) => {
      state.postReviewStatus = FetchStatus.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.fetchReviewsStatus = FetchStatus.Success;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.fetchReviewsStatus = FetchStatus.Error;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.fetchReviewsStatus = FetchStatus.Pending;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.postReviewStatus = FetchStatus.Success;
        const newReview = action.payload;

        if (newReview) {
          state.reviews.push(newReview);
        }
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.postReviewStatus = FetchStatus.Error;
      });
  },
});
