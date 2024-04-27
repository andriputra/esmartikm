import { ActionTree } from 'vuex'
import { RootState } from '~/store'

export const actions: ActionTree<RootState, RootState> = {
  INIT({ rootState, commit, dispatch }): void {
    commit('users/model/SET_ERRORS', [], { root: true })
    dispatch('users/model/LOAD', { ...rootState.auth.user }, { root: true })
  },
  async SUBMIT({ rootState, commit }): Promise<any> {
    commit('users/model/SET_ERRORS', [], { root: true })
    commit('users/model/SAVING', {}, { root: true })

    try {
      const modelAttrs = rootState.users.model.attrs
      const fields = [
        'username',
        'email',

        // business
        'form_type',
        'name',
        'phone',
        'npwp',
        'npwp_image',
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
        'owner_npwp_image',
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

      const response = await this.$api.profile.postUpload(data)

      commit('users/model/SAVED', {}, { root: true })
      return { error: false, response }
    } catch (error: any) {
      if (error.response?.status === 422) {
        commit('users/model/SET_ERRORS', error.response.data.errors, {
          root: true,
        })
      }

      commit('users/model/SAVED', {}, { root: true })
      return { error, response: error.response }
    }
  },
}
