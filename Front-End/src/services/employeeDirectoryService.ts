import ApiService from "./apiService";


export async function apiGetEmployeeDetails<T>() {
    return ApiService.fetchData<T>({
      url: "/employees",
      method: "get",
    });
  }