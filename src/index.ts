import { BadRequestError, NotFoundError, UnauthorizedError, UnknownError } from './errors'
import { CodesEnum, IRequest, IResponse, ITransport, IListeners, ListenCallback } from './types'

export * from './types'
export * from './errors'

export interface IHermesOptions<IDefaultMeta> {
  transport: ITransport
  defaultMeta?: IDefaultMeta
}

export function createHermes<IDefaultMeta>({
  transport,
  defaultMeta,
}: IHermesOptions<IDefaultMeta>) {
  const listeners: IListeners = {}

  async function fetch<T, K>(path: string, request?: IRequest<any, any>): Promise<IResponse<T, K>> {
    const response = (await transport.fetch(path, {
      body: request?.body ?? {},
      meta: { ...(defaultMeta ?? {}), ...(request?.meta ?? {}) },
    })) as IResponse<T, K>

    if (!response.meta.isSuccess) {
      switch (response.meta.code) {
        case CodesEnum.BadRequest:
          throw new BadRequestError('Invalid request', response)
        case CodesEnum.NotFound:
          throw new NotFoundError('Requested resource was not found', response)
        case CodesEnum.Unauthorized:
          throw new UnauthorizedError('Unauthorized to make that request', response)
        default:
          throw new UnknownError('Unknown error detected', response)
      }
    }

    return response
  }

  function listen<ReqData, ResData, ReqMeta = IDefaultMeta, ResMeta = any>(
    path: string,
    callback: ListenCallback<ReqData, ResData, ReqMeta, ResMeta>
  ) {
    if (listeners[path]) throw new Error('Listener already exists on that path')
    listeners[path] = callback
  }

  async function handleFetch(path: string, request: IRequest<any, any>) {
    const response: IResponse<any, any> = {
      body: {},
      meta: {
        isSuccess: true,
      },
    }
    const handler = listeners[path]
    if (!handler) {
      response.meta = {
        isSuccess: false,
        code: CodesEnum.NotFound,
      }
      return response
    }

    try {
      await handler(request, response)
    } catch (err) {
      response.meta.isSuccess = false
      if (err instanceof NotFoundError) response.meta.code = CodesEnum.NotFound
      else if (err instanceof BadRequestError) response.meta.code = CodesEnum.BadRequest
      else if (err instanceof UnauthorizedError) response.meta.code = CodesEnum.Unauthorized
      else response.meta.code = CodesEnum.Unknown
    }

    return response
  }

  return {
    fetch,
    listen,
    handleFetch,
  }
}
