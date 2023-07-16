import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    console.error("Error logging in user:", error);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loginSuccess } = userSlice.actions;
export const selectUser = (state) => state.user.user;
