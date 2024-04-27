import Axios from './axios'

class PasswordForgot extends Axios {
  readonly resource: string = '/api/password/forgot'
}

export default PasswordForgot
