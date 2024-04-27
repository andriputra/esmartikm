<template>
  <rich-select
    v-bind="$attrs"
    :options="options.map((opt) => opt.id)"
    :custom-label="customLabel"
    :searchable="true"
    :internal-search="false"
    :placeholder="$t('Search City')"
    :show-labels="false"
    v-on="$listenersExceptInput"
    @search-change="debouncedSearchOptions"
    @input="$emit('input', $event)"
  >
    <template slot="noOptions">{{ $t('Type a city name') }}</template>
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
    provinceId: { type: Number, default: null },
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    ...mapState('city', { options: 'cities' }),
  },
  created() {
    this.searchOptions(this.presearch)
  },
  methods: {
    ...mapActions('city', { searchOptions: 'SEARCH' }),
    debouncedSearchOptions: debounce(function (this: any, name: any) {
      this.searchOptions({
        name,
        ...(this.provinceId ? { province_id: this.provinceId } : {}),
      })
    }, 200),
    customLabel(val: number): string {
      const option = this.options.find((opt: any) => opt.id === val)
      if (option) return option.name
      return ''
    },
  },
})
</script>
