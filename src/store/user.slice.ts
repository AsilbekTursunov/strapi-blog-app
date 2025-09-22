import type { IAuthor } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  user: IAuthor | null,
  isLogin: boolean,
  error: string | null
}

const initialState: IInitialState = {
  user: null,
  isLogin: false,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isLogin = true
    },
    setLogout: (state) => {
      state.user = null
      state.isLogin = false
      localStorage.removeItem('token')
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setUser, setLogout, setError } = userSlice.actions
export default userSlice.reducer