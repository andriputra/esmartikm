<template>
  <field
    :label="$t('NPWP')"
    :error="'npwp' in errors"
    :feedback="errors.npwp"
    inline
  >
    <text-input
      :value="attrs.npwp"
      type="number"
      :placeholder="$t('NPWP')"
      :error="'npwp' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'npwp', value: $event })"
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
