import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userDetailReset } from "./profileSlice";

const userInfoFromStorage = localStorage.getItem("userInfo");

const initialState = {
  user: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
};

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/login/",
      { username: email, password: password },
      config
    );

    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/users/register/",
      { name, email, password },
      config
    );

    dispatch(registerSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.error("Error registering:", error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(logout());
  dispatch(userDetailReset());
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loginSuccess, logout, registerSuccess } = userSlice.actions;

export const selectUser = (state) => state.user.user;
