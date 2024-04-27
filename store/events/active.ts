import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  events: [],
  gallery: [],
  loading: false,
  catalogs: [],
})

export type ActiveState = ReturnType<typeof state>

export const mutations: MutationTree<ActiveState> = {
  SET: (state, events: Array<never>) => (state.events = events),
  SET_GALLERY: (state, gallery: Array<never>) => (state.gallery = gallery),
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_CATALOGS: (state, catalogs: any) => (state.catalogs = catalogs),
}

export const actions: ActionTree<ActiveState, RootState> = {
  async LOAD({ commit }) {
    const { data } = await this.$api.events.query({
      active: true,
    })
    commit('SET', data)
  },
  async LOAD_GALLERY({ commit, state }) {
    const { data } = await this.$api.gallery.query({
      event_id: (state.events[0] as any).id,
      perPage: 999,
    })
    commit('SET_GALLERY', data)
  },
  async LOAD_CATALOGS({ commit, state }, params: object) {
    commit('LOADING')
    const paginator = await this.$api.catalogs.query({
      perPage: 999,
      event_id: (state.events[0] as any).id,
      ...params,
    })
    commit('LOADED')
    commit('SET_CATALOGS', paginator.data)
  },
}
