<template>
  <field
    :label="$t('Username')"
    :error="'username' in errors"
    :feedback="errors.username"
    inline
    required
  >
    <text-input
      :value="attrs.username"
      type="text"
      :placeholder="$t('Username')"
      :error="'username' in errors"
      :disabled="saving || disabled"
      @input="updateAttrs({ key: 'username', value: $event })"
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
  props: {
    disabled: { type: Boolean, default: false },
  },
})
</script>
