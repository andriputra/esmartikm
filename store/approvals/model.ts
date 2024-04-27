import Vue from 'vue'
import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

const defaultAttrs = {
  status: '',
}

interface Attrs {
  [key: string]: any
}

export const state = (): {
  attrs: Attrs
  loading: boolean
  verifying: boolean
  errors: object[]
} => ({
  attrs: { ...defaultAttrs },
  loading: false,
  verifying: false,
  errors: [],
})

export type ModelState = ReturnType<typeof state>

export const mutations: MutationTree<ModelState> = {
  SET_ATTRS: (state, attrs) => (state.attrs = attrs),
  UPDATE_ATTRS: (state, { key, value }: { key: string; value: string }) => {
    if (state.attrs[key] !== value) {
      Vue.set(state.attrs, key, value)
    }
  },
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  VERIFYING: (state) => (state.verifying = true),
  VERIFIED: (state) => (state.verifying = false),
  SET_ERRORS: (state, errors: object[]) => (state.errors = errors),
}

export const actions: ActionTree<ModelState, RootState> = {
  async APPROVE({ state, commit }): Promise<any> {
    commit('VERIFYING')

    try {
      commit('UPDATE_ATTRS', { key: 'status', value: 'approved' })

      const fields = ['status']

      const modelAttrs = state.attrs
      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      await this.$api.approvals.put(state.attrs.id, data)
      commit('VERIFIED')
      return { error: false }
    } catch (error: any) {
      commit('VERIFIED')
      return { error }
    }
  },
  async REJECT({ state, commit }): Promise<any> {
    commit('SET_ERRORS', [])
    commit('VERIFYING')

    try {
      commit('UPDATE_ATTRS', { key: 'status', value: 'rejected' })

      const fields = ['status', 'reason']

      const modelAttrs = state.attrs
      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      await this.$api.approvals.put(state.attrs.id, data)
      commit('VERIFIED')
      return { error: false }
    } catch (error: any) {
      if (error.response?.status === 422) {
        commit('SET_ERRORS', error.response.data.errors)
      }

      commit('VERIFIED')
      return { error }
    }
  },
  async LOAD({ commit }, model?: number | Attrs): Promise<any> {
    commit('SET_ATTRS', { ...defaultAttrs })

    try {
      let attrs
      if (typeof model === 'number') {
        commit('LOADING')
        attrs = await this.$api.approvals.get(model)
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
}
