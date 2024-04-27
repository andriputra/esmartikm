<template>
  <field
    :label="$t('Bukapalak')"
    :error="'bukalapak' in errors"
    :feedback="errors.bukalapak"
    inline
  >
    <text-input
      :value="attrs.bukalapak"
      type="text"
      :placeholder="$t('Bukapalak URL')"
      :error="'bukalapak' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'bukalapak', value: $event })"
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
