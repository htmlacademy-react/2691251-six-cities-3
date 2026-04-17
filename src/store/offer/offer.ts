import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer, Offer } from '../../types/offer';
import { fetchFullOffer, fetchNearByOffers, postFavorite } from '../api-actions';
import { RequestStatus } from '../../const';

type OfferState = {
  info: FullOffer | null;
  nearby: Offer[];
  status: RequestStatus;
  activeId?: Offer['id'] | null;
};

const initialState: OfferState = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle,
  activeId: null
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    clearOffer(state) {
      state.info = null;
      state.nearby = [];
      state.status = RequestStatus.Idle;
    },
    setActiveId(state, action: PayloadAction<Offer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullOffer.fulfilled, (state, action) => {
        state.info = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchFullOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchFullOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearByOffers.fulfilled, (state, action) => {
        state.nearby = action.payload;
      })
      // обработка избранного для оффера
      .addCase(postFavorite.fulfilled, (state, action) => {
        const changedOffer = action.payload;

        if (state.info?.id === changedOffer.id) {
          state.info.isFavorite = changedOffer.isFavorite;
        }
        // обработка избранного в предложениях неподалеку
        for (const offer of state.nearby) {
          if (offer.id === changedOffer.id) {
            offer.isFavorite = changedOffer.isFavorite;

            return;
          }
        }
      });
  },
});

const offerActions = { ...offerSlice.actions, fetchNearByOffers, fetchFullOffer };

export { offerActions, offerSlice };
