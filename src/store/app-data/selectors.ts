import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getStatus = (state: State): RequestStatus => state[NameSpace.Data].status;
