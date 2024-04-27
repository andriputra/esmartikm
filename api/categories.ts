import Axios from './axios'

class Categories extends Axios {
  readonly resource: string = '/api/categories'
}

export default Categories
