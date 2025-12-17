import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = action.payload;
      state.isLoggedIn = true;
      AsyncStorage.setItem('user', JSON.stringify(action.payload));
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      AsyncStorage.removeItem('user');
    },

    setUserFromStorage(state, action: PayloadAction<any>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
