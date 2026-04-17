import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/state';
import { CITIES } from '../../const';
import { City } from '../../types/offer';

const initialState: AppProcess = {
  city: CITIES[0],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeActiveCity: (state, action: PayloadAction<{ city: City }>) => {
      const { city } = action.payload;
      state.city = city;
    },
  },
});

export const {changeActiveCity} = appProcess.actions;
