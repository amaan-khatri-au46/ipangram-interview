import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetEmployeeDetails } from "src/services/employeeDirectoryService";

export const SLICE_NAME = "employeeDirectory";

export const fetchEmployeeDetail = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployeeDetail`,
  async ({ pageIndex, pageSize }: { pageIndex?: number; pageSize?: number } = {}) => {
      const response = await apiGetEmployeeDetails({ pageIndex, pageSize });
      return response?.data;
  }
);

export interface EmployeeDirectory {
    _id: string;
    name: string;
    location: string;
    email: string;
  }


export interface EmployeeDirectoryState {
    loading: boolean;
    employeeDirectoryList : EmployeeDirectory[]
    pagination: {
        total: number ;
        pageIndex: number;
        pageSize: number;
    };
}

const initialState: EmployeeDirectoryState = {
    loading: false,
    employeeDirectoryList : [],
    pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    }
};


const employeeDirectory = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setPageSize : (state,action) => {
          state.pagination.pageSize = action.payload
      },
      setPageIndex : (state, action) => {
          state.pagination.pageIndex = action.payload
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchEmployeeDetail.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchEmployeeDetail.fulfilled, (state, action:any) => {
        state.employeeDirectoryList = action?.payload?.employees as EmployeeDirectory[]
        state.pagination.total = action?.payload?.totalEmployees
        state.loading = false;
      });
      builder.addCase(fetchEmployeeDetail.rejected, (state) => {
        state.loading = true;
      });
    }
  });
  
  export const { setLoading, setPageSize, setPageIndex } = employeeDirectory.actions;
  
  export default employeeDirectory.reducer;