<template>
  <field
    :label="$t('KTP Number')"
    :error="'ktp' in errors"
    :feedback="errors.ktp"
    inline
    required
  >
    <text-input
      :value="attrs.ktp"
      type="number"
      :placeholder="$t('KTP Number')"
      :error="'ktp' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'ktp', value: $event })"
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
