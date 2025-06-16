import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import { appData } from './app-data/app-data';
import {appProcess} from './app-process/app-process';
import {userProcess} from './user-process/user-process';
import { offerSlice } from './offer/offer';
import { reviewsSlice } from './review/review';
import { favoritesSlice } from './favorites/favorites';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Review]: reviewsSlice.reducer,
  [NameSpace.Favorites]: favoritesSlice.reducer

});
