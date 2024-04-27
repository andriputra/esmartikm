import Axios from './axios'

class Settings extends Axios {
  readonly resource: string = '/api/settings'
}

export default Settings
