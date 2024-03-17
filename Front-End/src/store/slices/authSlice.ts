import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetLogin, apiGetRegister } from "../../services/authService";


export const SLICE_NAME = "auth";


export const login = createAsyncThunk(
    `${SLICE_NAME}/login`,
    async ({ values }: { values: any }) => {
      const response:any = await apiGetLogin(values);
      return response;
    }
  );
  
export const register = createAsyncThunk(
    `${SLICE_NAME}/register`,
    async ({ values }: { values: any }) => {
      const response = await apiGetRegister(values);
      return response?.data;
    }
  );

  export interface AuthState {
    loading : boolean
    role : string
  }

  const initialState: AuthState = {
    loading : false,
    role : ''
  };


  const authSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setRole:(state,action) => {
         state.role =  action.payload
      }
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(login.fulfilled, (state) => {
        state.loading = false;
      });
      builder.addCase(login.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(register.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(register.fulfilled, (state) => {
        state.loading = false;
      });
      builder.addCase(register.rejected, (state) => {
        state.loading = false;
      });
    }
  });
  
  export const { setLoading, setRole } = authSlice.actions;
  
  export default authSlice.reducer;