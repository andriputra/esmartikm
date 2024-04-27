import Vue from 'vue'
import { MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'

const defaultAttrs = {
  description: '',
  name: '',
  active: 0,
}

interface Attrs {
  [key: string]: any
}

export const state = (): {
  attrs: Attrs
  loading: boolean
  saving: boolean
  deleting: boolean
  errors: object[]
} => ({
  attrs: { ...defaultAttrs },
  loading: false,
  saving: false,
  deleting: false,
  errors: [],
})

export type ModelState = ReturnType<typeof state>

export const mutations: MutationTree<ModelState> = {
  SET_ATTRS: (state, attrs) => (state.attrs = attrs),
  UPDATE_ATTRS: (state, { key, value }: { key: string; value: string }) => {
    if (state.attrs[key] !== value) {
      Vue.set(state.attrs, key, value)
    }
  },
  RESET_ATTRS: (state) => {
    state.attrs = { ...defaultAttrs }
    state.errors = []
  },
  LOADING: (state) => (state.loading = true),
  LOADED: (state) => (state.loading = false),
  SAVING: (state) => (state.saving = true),
  SAVED: (state) => (state.saving = false),
  DELETING: (state) => (state.deleting = true),
  DELETED: (state) => (state.deleting = false),
  SET_ERRORS: (state, errors: object[]) => (state.errors = errors),
}

export const actions: ActionTree<ModelState, RootState> = {
  async LOAD({ commit }, model: number | Attrs): Promise<any> {
    commit('SET_ATTRS', { ...defaultAttrs })

    try {
      let attrs
      if (typeof model === 'number') {
        commit('LOADING')
        attrs = await this.$api.events.get(model)
        commit('LOADED')
      } else if (model && model.id) {
        attrs = model
      }

      commit('SET_ATTRS', attrs)

      return { error: false }
    } catch (error: any) {
      commit('LOADED')

      return { error }
    }
  },
  async RELOAD({ state, commit }): Promise<any> {
    if (!state.attrs.id) return

    try {
      commit('LOADING')
      const attrs = await this.$api.events.get(state.attrs.id)
      commit('SET_ATTRS', attrs)

      return { error: false }
    } catch (error: any) {
      commit('LOADED')

      return { error }
    }
  },
  async SUBMIT({ state, commit }): Promise<any> {
    commit('SET_ERRORS', [])
    commit('SAVING', {})

    try {
      const modelAttrs = state.attrs
      const fields = ['description', 'name', 'active']

      const data = Object.keys(modelAttrs)
        .filter((key): boolean => fields.includes(key))
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = modelAttrs[key]
          return obj
        }, {})

      let response
      if (modelAttrs.id) {
        response = await this.$api.events.put(modelAttrs.id, data)
      } else {
        response = await this.$api.events.post(data)
      }

      commit('SAVED')
      return { error: false, response }
    } catch (error: any) {
      if (error.response?.status === 422) {
        commit('SET_ERRORS', error.response.data.errors)
      }

      commit('SAVED')
      return { error, response: error.response }
    }
  },
  async DELETE({ state, commit }): Promise<any> {
    commit('DELETING')

    try {
      await this.$api.events.delete(state.attrs.id)
      commit('DELETED')
      return { error: false }
    } catch (error: any) {
      commit('DELETED')
      return { error }
    }
  },
  async REGISTER({ state, commit }, userId: number): Promise<any> {
    commit('DELETING')

    try {
      await this.$api.eventRegister.eventId(state.attrs.id).post({
        user_id: userId,
      })
      commit('DELETED')
      return { error: false }
    } catch (error: any) {
      commit('DELETED')
      return { error }
    }
  },
  async UNREGISTER({ state, commit }, userId: number): Promise<any> {
    commit('DELETING')

    try {
      await this.$api.eventUnregister.eventId(state.attrs.id).post({
        user_id: userId,
      })
      commit('DELETED')
      return { error: false }
    } catch (error: any) {
      commit('DELETED')
      return { error }
    }
  },
}
