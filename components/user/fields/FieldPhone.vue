<template>
  <field
    :label="$t('Phone')"
    :error="'phone' in errors"
    :feedback="errors.phone"
    inline
    required
  >
    <text-input
      :value="attrs.phone"
      type="number"
      :placeholder="$t('Phone')"
      :error="'phone' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'phone', value: $event })"
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
