import Axios from './axios'

class Catalogs extends Axios {
  readonly resource: string = '/api/catalogs'
}

export default Catalogs
