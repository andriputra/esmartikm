<template>
  <field
    :label="$t('Indotrading')"
    :error="'indotrading' in errors"
    :feedback="errors.indotrading"
    inline
  >
    <text-input
      :value="attrs.indotrading"
      type="text"
      :placeholder="$t('Indotrading URL')"
      :error="'indotrading' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'indotrading', value: $event })"
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
