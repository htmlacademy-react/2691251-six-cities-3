import {NameSpace, RequestStatus} from '../../const';
import {State} from '../../types/state';
import { FullOffer, Offer } from '../../types/offer';

export const getNearByOffers = (state: State): Offer[] => state[NameSpace.Offer].nearby;
export const getFullOffer = (state: State): FullOffer|null => state[NameSpace.Offer].info;
export const getOfferStatus = (state: State): RequestStatus => state[NameSpace.Offer].status;
