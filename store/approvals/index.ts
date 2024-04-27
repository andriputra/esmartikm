import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  paginator: {},
})

export type ApprovalState = ReturnType<typeof state>

export const mutations: MutationTree<ApprovalState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PAGINATOR: (state, paginator: any) => (state.paginator = paginator),
}

export const actions: ActionTree<ApprovalState, RootState> = {
  async GET({ commit }, params: object) {
    commit('LOADING')
    const paginator = await this.$api.approvals.query(params)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
}
