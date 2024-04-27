<template>
  <rich-select
    :options="options.map((opt) => opt.id)"
    :custom-label="customLabel"
    :searchable="true"
    :internal-search="false"
    v-bind="$attrs"
    :show-labels="false"
    v-on="$listenersExceptInput"
    @search-change="debouncedSearchOptions"
    @input="$emit('input', $event)"
  >
    <template slot="noOptions">{{ $t('Type an user name') }}</template>
  </rich-select>
</template>

<script lang="ts">
import Vue from 'vue'
import debounce from 'debounce'
import { mapState, mapActions } from 'vuex'
import RichSelect from '~/components/form/RichSelect.vue'

export default Vue.extend({
  components: { RichSelect },
  props: {
    presearch: { type: String, default: '' },
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    ...mapState('users', { options: 'users' }),
  },
  created() {
    this.searchOptions(this.presearch)
  },
  methods: {
    ...mapActions('users', { searchOptions: 'SEARCH' }),
    debouncedSearchOptions: debounce(function (this: any, name: any) {
      this.searchOptions(name)
    }, 200),
    customLabel(val: number): string {
      const option = this.options.find((opt: any) => opt.id === val)
      if (option) return option.name
      return ''
    },
  },
})
</script>
