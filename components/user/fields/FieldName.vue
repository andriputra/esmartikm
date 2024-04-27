<template>
  <field
    :label="$t('Name')"
    :error="'name' in errors"
    :feedback="errors.name"
    inline
    required
  >
    <text-input
      :value="attrs.name"
      type="text"
      :placeholder="$t('Name')"
      :error="'name' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'name', value: $event })"
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
