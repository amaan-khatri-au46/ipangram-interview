import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetEmployeeName } from "src/services/employeeDetailService";
import { apiCreateDepartment, apiDeleteDepartment, apiEditDepartment, apiGetDepartment } from "src/services/DepartmentService";

export const SLICE_NAME = "departmentList";

export const fetchDepartment = createAsyncThunk(
  `${SLICE_NAME}/fetchDepartment`,
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const response = await apiGetDepartment({ pageIndex, pageSize });
    return response?.data;
  }
);


export const fetchEmployeeName = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployeeName`,
  async () => {
    const response = await apiGetEmployeeName();
    return response?.data;
  }
);

export const createDepartment = createAsyncThunk(
  `${SLICE_NAME}/createDepartment`,
  async (data: any, { dispatch }) => {
    const response = await apiCreateDepartment(data);
    // dispatch(fetchDepartment()) 
    return response?.data;
  }
);

export const editDepartment = createAsyncThunk(
  `${SLICE_NAME}/editDepartment`,
  async ({ id, data }: { id: string, data: any }, { dispatch }) => {
    const response = await apiEditDepartment(id, data);
    // dispatch(fetchDepartment()) 
    return response?.data;
  }
);

export const deleteDepartment = createAsyncThunk(
  `${SLICE_NAME}/deleteDepartment`,
  async (departmentId: string, { dispatch }) => {
    const response = await apiDeleteDepartment(departmentId);
      // dispatch(fetchDepartment()) 
      return response
    }
);

export interface Department {
  _id: string;
  name: string;
  location: string;
  Budget: number;
}

export interface DepartmentListState {
  loading : boolean
  departmentTableList : Department[]
  pagination: {
    total: number ;
    pageIndex: number;
    pageSize: number;
};
  openDrawer : boolean
  openDeleteDailog : boolean
  editRow : Department[]
  deleteRow : Department[]
  employeeName : any
}

const initialState: DepartmentListState = {
  loading : false,
  departmentTableList : [],
  pagination: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
 },
  openDrawer : false,
  openDeleteDailog : false,
  editRow : [],
  deleteRow : [],
  employeeName : []
};

const departmentListSlice = createSlice({
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
    setDrawer : (state , action ) => {
      state.openDrawer = action.payload
    },
    setOpenDeleteDailog : (state , action) => {
      state.openDeleteDailog = action.payload
    },
    setEditRow : (state, action) => {
        state.editRow = action.payload
    },
    setDeleteRow : (state, action) => {
        state.deleteRow = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDepartment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartment.fulfilled, (state , action:any) => {
      state.loading = false ;
      state.departmentTableList = action.payload?.departments as Department[];
      state.pagination.total = action?.payload?.totalDepartments
    });
    builder.addCase(fetchDepartment.rejected, (state) => {
      state.loading = false ;
    });
    builder.addCase(fetchEmployeeName.fulfilled, (state, action) => {
      state.employeeName = action.payload;
    });
  }
});

export const { 
  setLoading, 
  setPageSize,
  setPageIndex,
  setDrawer, 
  setEditRow , 
  setDeleteRow , 
  setOpenDeleteDailog
} = departmentListSlice.actions;

export default departmentListSlice.reducer;
