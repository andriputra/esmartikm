import Axios from './axios'

class Events extends Axios {
  readonly resource: string = '/api/events'
}

export default Events
