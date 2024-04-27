import Axios from './axios'

class Account extends Axios {
  readonly resource: string = '/api/account'
}

export default Account
