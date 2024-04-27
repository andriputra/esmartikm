import Axios from './axios'

class Profile extends Axios {
  readonly resource: string = '/api/password/change'
}

export default Profile
