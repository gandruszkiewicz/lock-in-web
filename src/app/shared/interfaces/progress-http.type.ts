export interface ProgressHttp{
    IsVisible: boolean,
    Percentage: number,
    source: string,
    isError: boolean,
    errorInterval?: number
}