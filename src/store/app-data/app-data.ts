import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { RequestStatus } from '../../const';
import { postFavorite } from '../api-actions';
import { logoutAction } from '../api-actions';

const initialState: AppData = {
  offers: [],
  status: RequestStatus.Idle,
};

const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const changedOffer = action.payload;
        for (const offer of state.offers) {
          if (offer.id === changedOffer.id) {
            offer.isFavorite = changedOffer.isFavorite;
            return;
          }
        }
      })
      .addCase(logoutAction.fulfilled, () => initialState);
  }
});

const offersActions = {...appData.actions, fetchOffersAction};

export { appData, offersActions };
