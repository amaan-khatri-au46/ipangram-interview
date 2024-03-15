import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateEmployee, apiDeleteEmployee, apiEditEmployee, apiGetEmployee, apiGetEmployeeDetails, apiGetEmployeeLocation, apiGetEmployeeName } from "../../services/employeeService";

export const SLICE_NAME = "employeeList";

export const fetchEmployee = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployee`,
  async ({ location, name }: { location?: any; name?: any }, { dispatch }) => {
    dispatch(fetchEmployeeLocation());
    dispatch(fetchEmployeeName());
    const response = await apiGetEmployee({ location, name });
    return response?.data;
  }
);

export const fetchEmployeeDetail = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployeeDetail`,
  async () => {
    const response = await apiGetEmployeeDetails();
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

export interface EmployeeListState {
  loading : boolean
  employeeTableList : Employee[]
  employeeDetailList : Employee[]
  openDrawer : boolean
  openDeleteDailog : boolean
  editRow : Employee[]
  deleteRow : Employee[]
  employeeLocation : any
  employeeName : any
  filterLocation : string
  filterName : string
}

const initialState: EmployeeListState = {
  loading : false,
  employeeTableList : [],
  employeeDetailList : [],
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
    builder.addCase(fetchEmployee.fulfilled, (state , action) => {
      state.loading = false ;
      state.employeeTableList = action.payload as Employee[];
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.loading = false ;
    });
    builder.addCase(fetchEmployeeDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployeeDetail.fulfilled, (state , action) => {
      state.loading = false ;
      state.employeeDetailList = action.payload as Employee[];
    });
    builder.addCase(fetchEmployeeDetail.rejected, (state) => {
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

export const { setLoading, setDrawer, setEditRow , setDeleteRow , setOpenDeleteDailog, setFilterLocation, setFilterName} = employeeListSlice.actions;

export default employeeListSlice.reducer;
