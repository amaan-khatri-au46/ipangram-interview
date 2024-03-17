/** @format */

import ApiService from "./apiService";



export async function apiGetDepartment<T>({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) {
  return ApiService.fetchData<T>({
    url: "/department",
    method: "get",
    params: { pageIndex, pageSize },
  });
}


export async function apiCreateDepartment<T>(data:any) {
  return ApiService.fetchData<T>({
    url: "/department",
    method: "post",
    data: data,
  });
}

export async function apiEditDepartment<T>(id: string, data: any) {
  return ApiService.fetchData<T>({
    url: `/department/${id}`,
    method: "put",
    data: data,
  });
}

export async function apiDeleteDepartment(departmentId: string) {
  return ApiService.fetchData<{ success: boolean }>({
    url: `/department/${departmentId}`,
    method: "delete",
  });
}



