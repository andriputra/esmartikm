import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  paginator: {},
  events: [],
})

export type EventState = ReturnType<typeof state>

export const mutations: MutationTree<EventState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PAGINATOR: (state, paginator: any) => (state.paginator = paginator),
  SET_EVENTS: (state, events: Array<never>) => (state.events = events),
}

export const actions: ActionTree<EventState, RootState> = {
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
    const paginator = await this.$api.events.query(query)
    paginator.per_page = Number(paginator.per_page)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
  async SEARCH({ commit }, name: string) {
    commit('LOADING')
    const events = await this.$api.events.query({ name, autocomplete: 1 })
    commit('SET_EVENTS', events)
    commit('LOADED')
  },
}
