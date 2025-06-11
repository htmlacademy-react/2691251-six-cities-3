import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { City } from '../../types/offer';

export const getCity = (state: State): City => state[NameSpace.App].city;
export const getUserEmail = (state: State): string => state[NameSpace.App].userEmail;
export const getErrorStatus = (state: State): boolean => state[NameSpace.App].error;
