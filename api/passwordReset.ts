import Axios from './axios'

class PasswordReset extends Axios {
  readonly resource: string = '/api/password/reset'
}

export default PasswordReset
