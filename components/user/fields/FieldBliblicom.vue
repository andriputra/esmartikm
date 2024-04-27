<template>
  <field
    :label="$t('Blibli')"
    :error="'bliblicom' in errors"
    :feedback="errors.bliblicom"
    inline
  >
    <text-input
      :value="attrs.bliblicom"
      type="text"
      :placeholder="$t('Blibli URL')"
      :error="'bliblicom' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'bliblicom', value: $event })"
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
