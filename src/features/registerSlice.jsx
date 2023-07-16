// import { createSlice } from "@reduxjs/toolkit";

// import axios from "axios";
// export const registerUser = (name, email, password) => async (dispatch) => {
//   try {
//     const { data } = await axios.post(
//       "http://127.0.0.1:8000/api/users/register",
//       {
//         name,
//         username: email,
//         password,
//       }
//     );
//     dispatch(registerRequest(data));
//   } catch (error) {
//     dispatch(registerRequest(error.message));
//   }
// };

// const initialState = {
//   status: "idle",
//   error: null,
//   user: {},
// };

// const registerSlice = createSlice({
//   name: "register",
//   initialState,
//   reducers: {
//     registerRequest: (state, action) => {
//       state.status = "loading";
//     },
//   },
//   extraReducers: {
//     [registerUser.fulfilled]: (state, action) => {
//       state.status = "succeeded";
//       state.user = action.payload;
//     },
//   },
// });

// export const { registerRequest } = registerSlice.actions;

// export default registerSlice.reducer;

// export const getRegisterStatus = (state) => state.register.status;
// export const getRegisterError = (state) => state.register.error;
// export const getRegisterUser = (state) => state.register.user;
