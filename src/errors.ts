import { IResponse, CodesEnum } from './types'

export class UnknownError<T = any, K = any> extends Error {
  response: IResponse<T, K>
  code: CodesEnum
  constructor(message: string, response: IResponse<T, K>) {
    super(message)
    this.response = response
    this.code = CodesEnum.Unknown
  }
}

export class NotFoundError<T = any, K = any> extends Error {
  response: IResponse<T, K>
  code: CodesEnum
  constructor(message: string, response: IResponse<T, K>) {
    super(message)
    this.response = response
    this.code = CodesEnum.NotFound
  }
}

export class BadRequestError<T = any, K = any> extends Error {
  response: IResponse<T, K>
  code: CodesEnum
  constructor(message: string, response: IResponse<T, K>) {
    super(message)
    this.response = response
    this.code = CodesEnum.BadRequest
  }
}

export class UnauthorizedError<T = any, K = any> extends Error {
  response: IResponse<T, K>
  code: CodesEnum
  constructor(message: string, response: IResponse<T, K>) {
    super(message)
    this.response = response
    this.code = CodesEnum.Unauthorized
  }
}
