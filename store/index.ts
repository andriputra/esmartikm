import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  version: '0.1',
})

export type RootState = {
  [key: string]: any
}

export const getters: GetterTree<RootState, RootState> = {
  version: (state) => state.version,
}

export const mutations: MutationTree<RootState> = {
  // CHANGE_VERSION: (state, newVersion: string) => (state.version = newVersion),
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }): Promise<any> {
    try {
      await dispatch('settings/model/LOAD')
      await dispatch('events/active/LOAD')

      return { error: false }
    } catch (error: any) {
      return { error }
    }
  },
  async fetchThings(/* { commit } */) {
    // const things = await this.$axios.$get('/things')
    // commit('CHANGE_NAME', 'New name')
  },
}
