<template>
  <field
    :label="$t('Description')"
    :error="'description' in errors"
    :feedback="errors.description"
    inline
  >
    <text-input
      :value="attrs.description"
      type="textarea"
      :error="'description' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'description', value: $event })"
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
