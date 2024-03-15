/** @format */

import ApiService from "./ApiService";


export async function apiGetEmployee<T>({ location, name }: { location: string; name: string }) {
  return ApiService.fetchData<T>({
    url: `/employees/filter?location=${location}&name=${name}`,
    method: "get",
  });
}

export async function apiGetEmployeeDetails<T>() {
  return ApiService.fetchData<T>({
    url: "/employees",
    method: "get",
  });
}

export async function apiGetEmployeeLocation<T>() {
  return ApiService.fetchData<T>({
    url: "/employee/locations",
    method: "get",
  });
}


export async function apiGetEmployeeName<T>() {
  return ApiService.fetchData<T>({
    url: "/employee/name",
    method: "get",
  });
}

export async function apiCreateEmployee<T>(data:any) {
  return ApiService.fetchData<T>({
    url: "/employees",
    method: "post",
    data: data,
  });
}

export async function apiEditEmployee<T>(id: string, data: any) {
  return ApiService.fetchData<T>({
    url: `/employees/${id}`,
    method: "put",
    data: data,
  });
}

export async function apiDeleteEmployee(employeeId: string) {
  return ApiService.fetchData<{ success: boolean }>({
    url: `/employees/${employeeId}`,
    method: "delete",
  });
}



