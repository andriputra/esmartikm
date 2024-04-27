import Vue from 'vue'
import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

const defaultAttrs = {
  // account
  username: '',
  email: '',
  password: '',
  password_confirmation: '',

  // business
  form_type: '',
  name: '',
  phone: '',
  npwp: '',
  number_of_employees: '',
  established_date: '',
  city_id: '',
  address: '',
  bussines_type: '',

  // business license
  bussines_license_owned: [],
  bussines_license_number: [],
  kbli_number: '',

  // business owner
  owner_name: '',
  owner_phone: '',
  owner_birthdate: '',
  ktp: '',
  ktp_image: '',
  owner_npwp: '',
  education: '',

  // links
  instagram: '',
  facebook: '',
  youtube: '',
  tiktok: '',
  linkedin: '',
  whatsapp: '',
  website: '',
  tokopedia: '',
  bukalapak: '',
  bliblicom: '',
  shopee: '',
  indotrading: '',

  // product
  sub_category_id: '',
  product_image: '',
  have_trademark: '',
  product_consumer: [],
  marketing_area: [],

  // product certification
  product_certification: '',
  product_certification_file: '',
  tkdn_certification: '',
  tkdn_certification_file: '',
  halal_certification: '',
  halal_certification_file: '',
  sni_certification: '',
  sni_certification_file: '',
  distribution_permit: '',
  distribution_permit_file: '',

  // supperting questions
  have_online_admin: '',
  financial_record: '',
  separating_finance: '',
  bussines_problem: '',
  attended_ikma_programs: [],
  attended_other_institution_programs: '',
  willing_digital_marketing_workshop_program: '',
  interested_ikma_programs: [],
  interested_ikma_trainings: [],
  get_info_from: [],
}

interface Attrs {
  [key: string]: any
}

export const state = (): {
  attrs: Attrs
  loading: boolean
  saving: boolean
  verifying: boolean
  deleting: boolean
  errors: object[]
} => ({
  attrs: { ...defaultAttrs },
  loading: false,
  saving: false,
  verifying: false,
  deleting: false,
  errors: [],
})

export type ModelState = ReturnType<typeof state>

export const mutations: MutationTree<ModelState> = {
  SET_ATTRS: (state, attrs) => (state.attrs = attrs),
  UPDATE_ATTRS: (state, { key, value }: { key: string; value: string }) => {
    if (state.attrs[key] !== value) {
      Vue.set(state.attrs, key, value)
      Vue.delete(state.errors, key)
    }
  },
  RESET_ATTRS: (state) => {
    state.attrs = { ...defaultAttrs }
    state.errors = []
  },
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SAVING: (state) => (state.saving = true),
  SAVED: (state) => (state.saving = false),
  VERIFYING: (state) => (state.verifying = true),
  VERIFIED: (state) => (state.verifying = false),
  DELETING: (state) => (state.deleting = true),
  DELETED: (state) => (state.deleting = false),
  SET_ERRORS: (state, errors: object[]) => (state.errors = errors),
}

export const actions: ActionTree<ModelState, RootState> = {
  async LOAD({ commit }, model?: number | Attrs): Promise<any> {
    commit('RESET_ATTRS')

    try {
      let attrs
      if (typeof model === 'number') {
        commit('LOADING')
        attrs = await this.$api.users.get(model)
        commit('LOADED')
      } else if (model && model.id) {
        attrs = model
      } else {
        commit('LOADING')
        attrs = await this.$api.profile.get()
        commit('LOADED')
      }

      commit('SET_ATTRS', attrs)

      return { error: false }
    } catch (error: any) {
      commit('LOADED')

      return { error }
    }
  },
  async RELOAD({ state, commit }): Promise<any> {
    if (!state.attrs.id) return

    try {
      commit('LOADING')
      const attrs = await this.$api.users.get(state.attrs.id)
      commit('SET_ATTRS', attrs)

      return { error: false }
    } catch (error: any) {
      commit('LOADED')

      return { error }
    }
  },
  async SUBMIT({ state, commit }): Promise<any> {
    commit('SET_ERRORS', [])
    commit('SAVING', {})

    try {
      const modelAttrs = state.attrs
      const fields = [
        'status',
        'username',
        'email',
        'password',
        'password_confirmation',

        // business
        'form_type',
        'name',
        'phone',
        'npwp',
        'number_of_employees',
        'investment_value',
        'established_date',
        'city_id',
        'address',
        'bussines_type',

        // business license
        'bussines_license_owned',
        'bussines_license_number',
        'kbli_number',

        // business owner
        'owner_name',
        'owner_phone',
        'owner_birthdate',
        'ktp',
        'ktp_image',
        'owner_npwp',
        'education',

        // links
        'instagram',
        'facebook',
        'youtube',
        'tiktok',
        'linkedin',
        'whatsapp',
        'website',
        'tokopedia',
        'bukalapak',
        'bliblicom',
        'shopee',
        'indotrading',

        // product
        'sub_category_id',
        'product_image',
        'have_trademark',
        'product_consumer',
        'marketing_area',

        // product certification
        'product_certification',
        'product_certification_file',
        'tkdn_certification',
        'tkdn_certification_file',
        'halal_certification',
        'halal_certification_file',
        'sni_certification',
        'sni_certification_file',
        'distribution_permit',
        'distribution_permit_file',

        // supperting questions
        'have_online_admin',
        'financial_record',
        'separating_finance',
        'bussines_problem',
        'attended_ikma_programs',
        'attended_other_institution_programs',
        'willing_digital_marketing_workshop_program',
        'interested_ikma_programs',
        'interested_ikma_trainings',
        'get_info_from',
      ]

      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      if (typeof data.product_image === 'string') delete data.product_image
      if (typeof data.ktp_image === 'string') delete data.ktp_image
      if (typeof data.product_certification_file === 'string')
        delete data.product_certification_file
      if (typeof data.tkdn_certification_file === 'string')
        delete data.tkdn_certification_file
      if (typeof data.halal_certification_file === 'string')
        delete data.halal_certification_file
      if (typeof data.sni_certification_file === 'string')
        delete data.sni_certification_file
      if (typeof data.distribution_permit_file === 'string')
        delete data.distribution_permit_file

      let response
      if (modelAttrs.id) {
        response = await this.$api.users.putUpload(modelAttrs.id, data)
      } else {
        response = await this.$api.users.postUpload(data)
      }

      commit('SAVED')
      return { error: false, response }
    } catch (error: any) {
      if (error.response?.status === 422) {
        commit('SET_ERRORS', error.response.data.errors)
      }

      commit('SAVED')
      return { error, response: error.response }
    }
  },
  async APPROVE({ state, commit }): Promise<any> {
    commit('VERIFYING')

    try {
      commit('UPDATE_ATTRS', { key: 'status', value: 'approved' })

      const fields = [
        'status',

        // just to fill required fields
        'username',
        'email',
        'phone',
        'name',
        'established_date',
        'owner_name',
        'owner_birthdate',
        'sub_category_id',
        'city_id',
        'address',
        'attended_ikma_programs',
        'attended_other_institution_programs',
        'bussines_license_number',
        'bussines_license_owned',
        'bussines_problem',
        'bussines_type',
        'education',
        'financial_record',
        'form_type',
        'get_info_from',
        'have_online_admin',
        'have_trademark',
        'interested_ikma_programs',
        'interested_ikma_trainings',
        'kbli_number',
        'ktp',
        'marketing_area',
        'number_of_employees',
        'owner_phone',
        'product_consumer',
        'separating_finance',
        'willing_digital_marketing_workshop_program',
        'investment_value',
        'whatsapp',
        'product_certification',
        'sni_certification',
      ]

      const modelAttrs = state.attrs
      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      if (typeof data.product_image === 'string') delete data.product_image
      if (typeof data.ktp_image === 'string') delete data.ktp_image

      await this.$api.users.putUpload(state.attrs.id, data)
      commit('VERIFIED')
      return { error: false }
    } catch (error: any) {
      commit('VERIFIED')
      return { error }
    }
  },
  async REJECT({ state, commit }): Promise<any> {
    commit('VERIFYING')

    try {
      commit('UPDATE_ATTRS', { key: 'status', value: 'rejected' })

      const fields = [
        'status',

        // just to fill required fields
        'username',
        'email',
        'phone',
        'name',
        'established_date',
        'owner_name',
        'owner_birthdate',
        'sub_category_id',
        'city_id',
        'address',
        'attended_ikma_programs',
        'attended_other_institution_programs',
        'bussines_license_number',
        'bussines_license_owned',
        'bussines_problem',
        'bussines_type',
        'education',
        'financial_record',
        'form_type',
        'get_info_from',
        'have_online_admin',
        'have_trademark',
        'interested_ikma_programs',
        'interested_ikma_trainings',
        'kbli_number',
        'ktp',
        'marketing_area',
        'number_of_employees',
        'owner_phone',
        'product_consumer',
        'separating_finance',
        'willing_digital_marketing_workshop_program',
        'investment_value',
        'whatsapp',
        'product_certification',
        'sni_certification',
      ]

      const modelAttrs = state.attrs
      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      if (typeof data.product_image === 'string') delete data.product_image
      if (typeof data.ktp_image === 'string') delete data.ktp_image

      await this.$api.users.putUpload(state.attrs.id, data)
      commit('VERIFIED')
      return { error: false }
    } catch (error: any) {
      commit('VERIFIED')
      return { error }
    }
  },
  async DELETE({ state, commit }): Promise<any> {
    commit('DELETING')

    try {
      await this.$api.users.delete(state.attrs.id)
      commit('DELETED')
      return { error: false }
    } catch (error: any) {
      commit('DELETED')
      return { error }
    }
  },
}
