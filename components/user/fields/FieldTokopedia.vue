<template>
  <field
    :label="$t('Tokopedia')"
    :error="'tokopedia' in errors"
    :feedback="errors.tokopedia"
    inline
  >
    <text-input
      :value="attrs.tokopedia"
      type="text"
      :placeholder="$t('Tokopedia URL')"
      :error="'tokopedia' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'tokopedia', value: $event })"
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
