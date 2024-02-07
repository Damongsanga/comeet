// userSlice.ts

import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import Login from "components/Auth/Login";
import { LoginResponse, UserState } from "models/Login.interface";

// Function to retrieve user state from sessionStorage
const loadUserState = (): UserState => {
  const storedState = sessionStorage.getItem("userState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState: UserState = {
  user: {
    nickname: "",
    profileImage: "",
    unreadNoteCount: 0,
    joinedRooms: [],
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserState(),
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isLoggedIn = false;
    },
  },
});

const saveUserState = (state: UserState) => {
  sessionStorage.setItem("userState", JSON.stringify(state));
};

export const setupUserStatePersistence = (store: Store) => {
  store.subscribe(() => {
    const state = store.getState().user;
    saveUserState(state);
  });
};

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
