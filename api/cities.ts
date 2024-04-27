import Axios from './axios'

class Cities extends Axios {
  readonly resource: string = '/api/cities'
}

export default Cities
