import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

export const state = () => ({
  loading: false,
  paginator: {
    data: [],
  },
})

export type GalleryState = ReturnType<typeof state>

export const mutations: MutationTree<GalleryState> = {
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SET_PAGINATOR: (state, paginator: any) => (state.paginator = paginator),
}

export const actions: ActionTree<GalleryState, RootState> = {
  async LOAD({ commit, state }, params: any) {
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
    const paginator = await this.$api.gallery.query(query)
    paginator.per_page = Number(paginator.per_page)
    paginator.data = state.paginator.data.concat(paginator.data)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
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
    const paginator = await this.$api.gallery.query(query)
    paginator.per_page = Number(paginator.per_page)
    commit('LOADED')
    commit('SET_PAGINATOR', paginator)
  },
}
