<template>
  <field
    :label="$t('Whatsapp')"
    :error="'whatsapp' in errors"
    :feedback="errors.whatsapp"
    inline
    required
  >
    <text-input
      :value="attrs.whatsapp"
      type="text"
      :placeholder="$t('Whatsapp URL')"
      :error="'whatsapp' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'whatsapp', value: $event })"
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
