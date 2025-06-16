import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Offer , FullOffer, FavoriteData} from '../types/offer.js';
import {redirectToRoute} from './action';
import { Review, PostCommentProps } from '../types/review.js';
import { APIRoute, AppRoute} from '../const';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { setUserEmail } from './app-process/app-process.js';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchFullOffer = createAsyncThunk<FullOffer, string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFullOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearByOffers = createAsyncThunk<Offer[], string,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearByOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Review[], FullOffer['id'],{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const fetchFavorites = createAsyncThunk<Offer[], undefined,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorites);
    return data;
  }
);

export const postFavorite = createAsyncThunk<Offer, FavoriteData,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postFavorite',
  async ({ id, isFavorite }, { extra: api }) => {
    const numberFavorite = Number(isFavorite);
    const { data } = await api.post<FullOffer>(`${APIRoute.Favorites}/${id}/${numberFavorite}`, { numberFavorite });
    return data;
  }
);

export const postReview = createAsyncThunk<Review, PostCommentProps,{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/post',
  async ({ body, offerId }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, body);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setUserEmail(email));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUserEmail(''));
  },
);
