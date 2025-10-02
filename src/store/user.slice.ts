import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAuthUser } from "@/types";

interface IInitialState {
  user: IAuthUser | null,
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
    setUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload
      state.isLogin = true
    },
    setLogout: (state) => {
      state.user = null
      state.isLogin = false
      localStorage.removeItem('token')
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    }
  }
})

export const { setUser, setLogout, setError } = userSlice.actions
export default userSlice.reducer