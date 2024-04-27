import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  paginator: {},
  users: [],
})

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PAGINATOR: (state, paginator: any) => (state.paginator = paginator),
  SET_USERS: (state, users: Array<never>) => (state.users = users),
}

export const actions: ActionTree<UserState, RootState> = {
  async GET({ commit }, params: any) {
    commit('LOADING')
    const query: any = { ...params }
    const sort = params.sort ? params.sort.split('+') : []
    if (sort[0]) {
      query.sortBy = sort[0]
    }

    if (sort[1]) {
      query.sortDir = sort[1]
    }

    delete query.sort
    const paginator = await this.$api.users.query(query)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
  async SEARCH({ commit }, name: string) {
    if (!name) return
    commit('LOADING')
    const users = await this.$api.users.query({ name, autocomplete: 1 })
    commit('SET_USERS', users)
    commit('LOADED')
  },
}
