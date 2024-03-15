import { configureStore, combineReducers, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import employeeReducer from './slices/employeeSlice'
import authReducer from './slices/authSlice'
import departmentReducer from './slices/departmentSlice'

const rootReducer = combineReducers({
  auth : authReducer,
  employee: employeeReducer,
  department : departmentReducer
});

const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, any, any>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
