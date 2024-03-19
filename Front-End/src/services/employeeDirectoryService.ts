import ApiService from "./ApiService";


export async function apiGetEmployeeDetails<T>({ pageIndex, pageSize }: { pageIndex?: number; pageSize?: number } = {}) {
  return ApiService.fetchData<T>({
      url: `/employees`,
      method: "get",
      params: { pageIndex, pageSize },
  });
}