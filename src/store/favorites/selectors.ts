import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Offer } from '../../types/offer';
import { RequestStatus } from '../../const';

export const getFavorites = (state: State): Offer[] => state[NameSpace.Favorites].items;
export const getFavoritesStatus = (state: State): RequestStatus => state[NameSpace.Favorites].status;
