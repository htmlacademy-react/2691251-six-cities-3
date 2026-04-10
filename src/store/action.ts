import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';


export const changeActiveCity = createAction<{city: City}>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setUserEmail = createAction<string>('app/setUserEmail');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

