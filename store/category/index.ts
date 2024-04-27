import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  params: {},
  categories: [],
})

export type CategoryState = ReturnType<typeof state>

export const mutations: MutationTree<CategoryState> = {
  SET_CATEGORIES: (state, categories: Array<never>) =>
    (state.categories = categories),
  SET_PARAMS: (state, params: object) => (state.params = params),
}

export const actions: ActionTree<CategoryState, RootState> = {
  async GET({ state, commit }, params: object) {
    if (state.categories.length && state.params === params) return
    const categories = await this.$api.categories.query(params)
    commit('SET_CATEGORIES', categories)
    commit('SET_PARAMS', params)
  },
}
