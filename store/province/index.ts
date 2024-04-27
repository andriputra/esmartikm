import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  provinces: [],
})

export type ProvinceState = ReturnType<typeof state>

export const mutations: MutationTree<ProvinceState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PROVINCES: (state, provinces: Array<never>) =>
    (state.provinces = provinces),
}

export const actions: ActionTree<ProvinceState, RootState> = {
  async SEARCH({ commit }, name: string) {
    commit('LOADING')
    const provinces = await this.$api.provinces.query({ name })
    commit('SET_PROVINCES', provinces)
    commit('LOADED')
  },
}
