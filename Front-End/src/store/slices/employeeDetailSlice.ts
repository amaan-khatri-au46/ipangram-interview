import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  apiCreateEmployee, 
  apiDeleteEmployee, 
  apiEditEmployee, 
  apiGetEmployee, 
  apiGetEmployeeLocation, 
  apiGetEmployeeName
} from "src/services/employeeDetailService";

export const SLICE_NAME = "employeeDetail";

export const fetchEmployee = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployee`,
  async ({ location, name, pageIndex, pageSize  }: 
    {location: string; name: string; pageIndex: number; pageSize: number  }) => {
      const response = await apiGetEmployee({  location, name, pageIndex, pageSize, });
      return response?.data;
  }
);


export const fetchEmployeeLocation = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployeeLocation`,
  async () => {
    const response = await apiGetEmployeeLocation();
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

export const createEmployee = createAsyncThunk(
  `${SLICE_NAME}/createEmployee`,
  async (data: any, { dispatch }) => {
    const response = await apiCreateEmployee(data);
    return response?.data;
  }
);

export const editEmployee = createAsyncThunk(
  `${SLICE_NAME}/editEmployee`,
  async ({ id, data }: { id: string, data: any }, { dispatch }) => {
    const response = await apiEditEmployee(id, data);
    return response?.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  `${SLICE_NAME}/deleteEmployee`,
  async (employeeId: string, { dispatch }) => {
    const response = await apiDeleteEmployee(employeeId);
      return response
    }
);

export interface Employee {
  _id: string;
  name: string;
  location: string;
  email: string;
}

export interface EmployeeDetailState {
  loading : boolean
  employeeTableList : Employee[]
  pagination: {
    total: number ;
    pageIndex: number;
    pageSize: number;
};
  openDrawer : boolean
  openDeleteDailog : boolean
  editRow : Employee[]
  deleteRow : Employee[]
  employeeLocation : any
  employeeName : any
  filterLocation : string
  filterName : string
}

const initialState: EmployeeDetailState = {
  loading : false,
  employeeTableList : [],
  pagination: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
},
  openDrawer : false,
  openDeleteDailog : false,
  editRow : [],
  deleteRow : [],
  employeeLocation : [],
  employeeName : [],
  filterLocation : 'All',
  filterName : 'All'
};

const employeeListSlice = createSlice({
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
    setFilterLocation : (state, action) => {
        state.filterLocation = action.payload
    },
    setFilterName : (state, action) => {
        state.filterName = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployee.fulfilled, (state , action:any) => {
      state.loading = false ;
      state.employeeTableList = action.payload?.employees as Employee[];
      state.pagination.total = action?.payload?.totalEmployees
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.loading = false ;
    });
    builder.addCase(fetchEmployeeLocation.fulfilled, (state, action:any) => {
      const uniqueLocations = Array.from(new Set(action.payload.map((location: any) => location.location)));
      state.employeeLocation = uniqueLocations;
    });
    builder.addCase(fetchEmployeeName.fulfilled, (state, action) => {
      state.employeeName = action.payload;
    });
  }
});

export const {
  setLoading,
  setDrawer, 
  setEditRow ,
  setDeleteRow , 
  setOpenDeleteDailog, 
  setFilterLocation,
  setFilterName, 
  setPageSize, 
  setPageIndex
} = employeeListSlice.actions;

export default employeeListSlice.reducer;
