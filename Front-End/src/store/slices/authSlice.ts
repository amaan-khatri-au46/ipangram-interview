import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetLogin, apiGetRegister } from "../../services/authService";


export const SLICE_NAME = "auth";


export const login = createAsyncThunk(
    `${SLICE_NAME}/login`,
    async ({ values }: { values: any }) => {
      const response:any = await apiGetLogin(values);
      return response?.data;
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
    //   builder.addCase(fetchProduct.pending, (state) => {
    //     state.loading = true;
    //   });
    }
  });
  
  export const { setLoading, setRole } = authSlice.actions;
  
  export default authSlice.reducer;