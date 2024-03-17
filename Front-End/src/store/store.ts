import { configureStore, combineReducers, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import employeeDetailReducer from './slices/employeeDetailSlice'
import employeeDirectoryReducer from './slices/employeeDirectorySlice'
import authReducer from './slices/authSlice'
import departmentReducer from './slices/departmentSlice'

const rootReducer = combineReducers({
  auth : authReducer,
  employeeDetail: employeeDetailReducer,
  employeeDirectory : employeeDirectoryReducer,
  department : departmentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, any>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
