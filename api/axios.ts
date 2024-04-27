import { serialize } from 'object-to-formdata'

export default class Axios {
  $axios: any
  resource: string = ''

  constructor($axios: any) {
    this.$axios = $axios
  }

  query(params: object = {}) {
    return this.$axios.$get(`${this.resource}`, { params })
  }

  get(id: number | string = '') {
    return this.$axios.$get(`${this.resource}/${id}`)
  }

  post(payload: object) {
    return this.$axios.$post(`${this.resource}`, payload)
  }

  postUpload(payload: object) {
    const formData = serialize(payload, {
      indices: true,
      nullsAsUndefineds: true,
    })

    return this.$axios.$post(`${this.resource}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  put(id: number | string, payload: object) {
    return this.$axios.$put(`${this.resource}/${id}`, payload)
  }

  putUpload(id: number | string, payload: object) {
    const formData = serialize(payload, {
      indices: true,
      nullsAsUndefineds: true,
    })

    return this.$axios.$post(`${this.resource}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  patch(id: number | string, payload: object) {
    return this.$axios.$patch(`${this.resource}/${id}`, payload)
  }

  delete(id: number | string) {
    return this.$axios.$delete(`${this.resource}/${id}`)
  }
}
