import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { postFavorite, fetchFavorites } from '../api-actions';

type FavoriteState = {
  items: Offer[];
  status: RequestStatus;
};

const initialState: FavoriteState = {
  items: [],
  status: RequestStatus.Idle
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      state.status = RequestStatus.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.items.push(action.payload);
        } else {
          state.items = state.items.filter((offer) => offer.id !== action.payload.id);
        }
      })
      .addCase(postFavorite.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postFavorite.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  }
});

const favoritesActions = {...favoritesSlice.actions, fetchFavorites, postFavorite};

export { favoritesActions, favoritesSlice };
