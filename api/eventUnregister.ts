import Axios from './axios'
import { REST } from '~/plugins/api'

export interface EventUnregistration {
  eventId: (id: number) => REST & EventUnregistration
}

class EventUnregister extends Axios {
  eventId(id: number) {
    this.resource = `/api/events/${id}/unregister`
    return this
  }
}

export default EventUnregister
