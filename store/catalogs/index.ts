import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  paginator: {},
})

export type CatalogState = ReturnType<typeof state>

export const mutations: MutationTree<CatalogState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PAGINATOR: (state, paginator: any) => (state.paginator = paginator),
}

export const actions: ActionTree<CatalogState, RootState> = {
  async GET({ commit }, params: object) {
    commit('LOADING')
    const paginator = await this.$api.catalogs.query(params)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
}
