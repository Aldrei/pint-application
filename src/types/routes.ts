export interface IRoute {
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-pattern
  go(params?: any): string,
}

export interface IRoutes {
  [index: string]: IRoute
}
