// Response/Request
export interface IRequest<T, K = { [key: string]: any }> {
  body: T
  meta: K
}

export interface IResponse<T, K> {
  body: T
  meta: K & {
    isSuccess: boolean
    code: CodesEnum
  }
}

export enum CodesEnum {
  Success = 'success',
  NotFound = 'not-found',
  BadRequest = 'bad-request',
  Unauthorized = 'unauthorized',
  Unknown = 'unknown'
}

// Transports
export interface ITransport {
  fetch: FetchTransport
}

export type FetchTransport = (
  path: string,
  request: IRequest<any, any>
) => Promise<IResponse<any, any>>

// Listeners
export type ListenCallback<ReqData, ResData, ReqMeta = any, ResMeta = any> = (
  request: IRequest<ReqData, ReqMeta>,
  response: IResponse<ResData, ResMeta>
) => Promise<undefined | void>

export interface IListeners {
  [key: string]: ListenCallback<any, any>
}
