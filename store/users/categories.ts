import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  params: {},
  categories: [],
})

export type UserCategoryState = ReturnType<typeof state>

export const mutations: MutationTree<UserCategoryState> = {
  SET_CATEGORIES: (state, categories: Array<never>) =>
    (state.categories = categories),
  SET_PARAMS: (state, params: object) => (state.params = params),
}

export const actions: ActionTree<UserCategoryState, RootState> = {
  async GET({ state, commit }, params: object) {
    if (state.categories.length && state.params === params) return
    const categories = await this.$api.userCategories.query(params)
    commit('SET_CATEGORIES', categories)
    commit('SET_PARAMS', params)
  },
}
