import Axios from './axios'

class UserCategories extends Axios {
  readonly resource: string = '/api/users/categories'
}

export default UserCategories
