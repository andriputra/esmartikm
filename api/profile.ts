import Axios from './axios'

class Profile extends Axios {
  readonly resource: string = '/api/profile'
}

export default Profile
