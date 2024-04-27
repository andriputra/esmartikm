<template>
  <rich-select
    v-bind="$attrs"
    :options="mappedOptions"
    :placeholder="$t('Select Type')"
    :show-labels="false"
    v-on="$listenersExceptInput"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import RichSelect from '~/components/form/RichSelect.vue'

export default Vue.extend({
  components: { RichSelect },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    ...mapState('users/categories', { options: 'categories' }),
    mappedOptions() {
      return this.options.map((opt: any) => {
        return opt.name
      })
    },
  },
  created() {
    ;(this as any).fetchOptions()
  },
  methods: {
    ...mapActions('users/categories', { fetchOptions: 'GET' }),
  },
})
</script>
