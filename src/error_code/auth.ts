import { ErrorCode } from './index';

export var AuthErrorCode: {[key:string]: ErrorCode} = {
  NO_USER: {
    code: -2,
    message: "no user"
  },
  PASS_FAULT: {
    code: -3,
    message: "password fault"
  },
  EXIT_USER: {
    code: -4,
    message: "user has exit"
  },
  CAP_ERR: {
    code: -5,
    message: "captcha is wrong"
  }
}