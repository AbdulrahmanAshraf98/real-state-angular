export interface CrudServicesInterface {
  getAll(
    successHandler: (response: any) => {},
    errorHandler: (error: any) => {},
    completeHandler: () => {}
  ): any;
  getSingle(
    id: string,
    successHandler: (response: any) => {},
    errorHandler: (error: any) => {},
    completeHandler: () => {}
  ): any;
  add(
    data: any,
    successHandler: (response: any) => {},
    errorHandler: (error: any) => {},
    completeHandler: () => {}
  ): any;
  edit(
    id: string,
    data: any,
    successHandler: (response: any) => {},
    errorHandler: (error: any) => {},
    completeHandler: () => {}
  ): any;
  delete(
    id: string,
    successHandler: (response: any) => {},
    errorHandler: (error: any) => {},
    completeHandler: () => {},
    data: any
  ): any;
}
