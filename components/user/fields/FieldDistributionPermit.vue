<template>
  <field
    :label="
      $t('Write the Distribution Permit Number (Especially for food products)')
    "
    :error="'distribution_permit' in errors"
    :feedback="errors.distribution_permit"
  >
    <text-input
      :value="attrs.distribution_permit"
      type="text"
      :placeholder="$t('Write the number')"
      :error="'distribution_permit' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'distribution_permit', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import TextInput from '~/components/form/TextInput.vue'

export default Vue.extend({
  components: { TextInput },
  mixins: [mixin],
})
</script>
