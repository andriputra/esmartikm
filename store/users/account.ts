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
      const fields = ['username', 'email']

      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      const response = await this.$api.account.post(data)

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
