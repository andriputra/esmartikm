import Axios from './axios'
import { REST } from '~/plugins/api'

export interface EventRegistration {
  eventId: (id: number) => REST & EventRegistration
}

class EventRegister extends Axios {
  eventId(id: number) {
    this.resource = `/api/events/${id}/register`
    return this
  }
}

export default EventRegister
