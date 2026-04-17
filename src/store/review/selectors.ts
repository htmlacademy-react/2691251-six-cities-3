import {NameSpace} from '../../const';
import {State} from '../../types/state';
import { Review } from '../../types/review';

export const getReviews = (state: State): Review[] => state[NameSpace.Review].items;

