import Axios from './axios'

class Users extends Axios {
  readonly resource: string = '/api/users'
}

export default Users
