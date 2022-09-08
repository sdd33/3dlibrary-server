import { ErrorCode } from '../error_code';

export interface Result<T> {
  code: number,
  message: string,
  data: T
}
export interface Commoditie<T>{
  id:number,
  name: string,
  data: T
}

export function Ok<T>(data: T) {
  return {
    code: 0,
    message: "ok",
    data
  }
}

export function FailErrorCode(code: ErrorCode) {
  return {
    ...code,
    data: undefined
  }
}

export function Fail(msg?: string, code?: number) {
  return {
    code: code||-1,
    message: msg||"unknown",
    data: undefined
  }
}

export function FailSystemError(error) {
  return {
    code: 1,
    message: error?(error.message||String(error)):"[system error]unknown",
    data: undefined
  }
}
