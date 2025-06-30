export interface ICustomResponse{
    message: string;
    success: boolean;
}
export interface ICustomDataResponse<T> extends ICustomResponse{
    data: T
}
