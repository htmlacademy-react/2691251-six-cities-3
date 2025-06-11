import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppProcess } from '../../types/state';
import { CITIES } from '../../mocks/cities';
import { City } from '../../types/offer';

const initialState: AppProcess = {
  city: CITIES[0],
  error: false,
  userEmail: ''
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    changeActiveCity: (state, action: PayloadAction<{ city: City }>) => {
      const { city } = action.payload;
      state.city = city;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

export const {setError, changeActiveCity, setUserEmail} = appProcess.actions;
