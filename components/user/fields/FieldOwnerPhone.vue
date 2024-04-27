<template>
  <field
    :label="$t('Owner Phone')"
    :error="'owner_phone' in errors"
    :feedback="errors.owner_phone"
    inline
    required
  >
    <text-input
      :value="attrs.owner_phone"
      type="number"
      :placeholder="$t('Whatsapp Active')"
      :error="'owner_phone' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'owner_phone', value: $event })"
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
