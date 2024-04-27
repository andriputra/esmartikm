import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  tac: false,
})

export type RegisterState = ReturnType<typeof state>

export const mutations: MutationTree<RegisterState> = {
  AGREE: (state, tac: boolean) => (state.tac = tac),
}

export const actions: ActionTree<RegisterState, RootState> = {
  async SUBMIT({ state, rootState, commit }): Promise<any> {
    commit('users/model/SET_ERRORS', [], { root: true })
    commit('users/model/SAVING', {}, { root: true })

    try {
      const modelAttrs = rootState.users.model.attrs
      const fields = [
        'username',
        'email',
        'password',
        'password_confirmation',
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
        'bussines_license_owned',
        'bussines_license_number',
        'kbli_number',
        'owner_name',
        'owner_phone',
        'owner_birthdate',
        'ktp',
        'ktp_image',
        'owner_npwp',
        'owner_npwp_image',
        'education',
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
        'sub_category_id',
        'product_image',
        'have_trademark',
        'product_consumer',
        'marketing_area',
        'product_certification_number',
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

      data.tac = state.tac

      const response = await this.$api.register.postUpload(data)

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
