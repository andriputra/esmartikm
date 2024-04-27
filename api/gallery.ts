import Axios from './axios'

class Gallery extends Axios {
  readonly resource: string = '/api/galeries'
}

export default Gallery
