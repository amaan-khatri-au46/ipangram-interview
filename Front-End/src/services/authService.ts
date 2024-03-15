import ApiService from "./ApiService";

export async function apiGetLogin<T>(values: any) {
    return ApiService.fetchData<T>({
      url: '/login',
      method: 'post',
      data: values,
    });
  }
  
  export async function apiGetRegister<T>(values: any) {
    return ApiService.fetchData<T>({
      url: '/register',
      method: 'post',
      data: values,
    });
  }
  