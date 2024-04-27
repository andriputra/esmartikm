import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  cities: [],
})

export type CityState = ReturnType<typeof state>

export const mutations: MutationTree<CityState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_CITIES: (state, cities: Array<never>) => (state.cities = cities),
}

export const actions: ActionTree<CityState, RootState> = {
  async SEARCH(
    { commit },
    params: {
      name: string
      provinceId?: number
    }
  ) {
    if (!params.name && !params.provinceId) return
    commit('LOADING')
    const cities = await this.$api.cities.query(params)
    commit('SET_CITIES', cities)
    commit('LOADED')
  },
}
