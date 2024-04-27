import Axios from './axios'

class Approvals extends Axios {
  readonly resource: string = '/api/approvals'
}

export default Approvals
