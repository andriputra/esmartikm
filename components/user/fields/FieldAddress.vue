<template>
  <field
    :label="$t('Address')"
    :error="'address' in errors"
    :feedback="errors.address"
    inline
    required
  >
    <text-input
      :value="attrs.address"
      type="text"
      :placeholder="$t('Address')"
      :error="'address' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'address', value: $event })"
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
