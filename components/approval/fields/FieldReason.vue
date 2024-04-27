<template>
  <field :error="'reason' in errors" :feedback="errors.reason" class="mb-0">
    <text-input
      :value="attrs.reason"
      type="text"
      :placeholder="$t('Reason')"
      :error="'reason' in errors"
      :disabled="verifying"
      @input="updateAttrs({ key: 'reason', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import Field from '~/components/form/Field.vue'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { Field, TextInput },
  computed: {
    ...mapState('approvals/model', ['attrs', 'verifying', 'errors']),
  },
  methods: mapMutations('approvals/model', {
    updateAttrs: 'UPDATE_ATTRS',
  }),
})
</script>
