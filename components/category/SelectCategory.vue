<template>
  <rich-select
    v-bind="$attrs"
    :options="mappedOptions"
    group-values="subs"
    group-label="name"
    :custom-label="customLabel"
    :placeholder="$t('Select Category')"
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
  props: {
    type: { type: String, default: '' },
    eventId: {
      type: Number,
      default: null,
    },
  },
  computed: {
    $listenersExceptInput(): object {
      const listeners = this.$listeners // exclude `input`-listener
      delete listeners.input
      return listeners
    },
    ...mapState('category', { options: 'categories' }),
    mappedOptions(): object {
      return this.options.map((opt: any) => {
        return {
          name: opt.name,
          subs: opt.subs.map((sub: any) => sub.id),
        }
      })
    },
    subs(): any {
      return this.options.map((option: any) => option.subs).flat()
    },
  },
  watch: {
    type(): void {
      this.fetch()
    },
    eventId(): void {
      this.fetch()
    },
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch(): void {
      const params: any = {}

      if (this.type) {
        params.main_category_name = this.type
      }

      if (this.eventId) {
        params.event_id = this.eventId
      }

      this.fetchOptions(params)
    },
    ...mapActions('category', { fetchOptions: 'GET' }),
    customLabel(val: number): string {
      const subs: any = this.subs
      const opt = subs.find((sub: any) => sub.id === val)
      if (opt) return opt.name
      return ''
    },
  },
})
</script>
