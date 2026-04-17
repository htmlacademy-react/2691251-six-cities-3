import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { City } from '../../types/offer';

export const getCity = (state: State): City => state[NameSpace.App].city;
