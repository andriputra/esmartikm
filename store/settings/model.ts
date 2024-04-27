import Vue from 'vue'
import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

interface Attrs {
  [key: string]: any
}

export const state = (): {
  attrs: Attrs
  loading: boolean
  saving: boolean
} => ({
  attrs: {},
  loading: false,
  saving: false,
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
  SAVING: (state) => (state.saving = true),
  SAVED: (state) => (state.saving = false),
}

export const actions: ActionTree<ModelState, RootState> = {
  async LOAD({ commit }): Promise<any> {
    commit('LOADING')
    const attrs = await this.$api.settings.get()
    commit('LOADED')
    commit('SET_ATTRS', attrs)
  },
  async SAVE({ state, commit }, key: string): Promise<any> {
    commit('SAVING', {})

    try {
      const response = await this.$api.settings.post({
        key,
        value: state.attrs[key].value,
      })

      commit('SAVED')
      return { error: false, response }
    } catch (error: any) {
      commit('SAVED')
      return { error, response: error.response }
    }
  },
}
