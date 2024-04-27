<template>
  <field
    :label="$t('Linkedin')"
    :error="'linkedin' in errors"
    :feedback="errors.linkedin"
    inline
  >
    <text-input
      :value="attrs.linkedin"
      type="text"
      :placeholder="$t('Linkedin URL')"
      :error="'linkedin' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'linkedin', value: $event })"
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
