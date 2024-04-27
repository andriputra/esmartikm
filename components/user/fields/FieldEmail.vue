<template>
  <field
    :label="$t('Email')"
    :error="'email' in errors"
    :feedback="errors.email"
    inline
    required
  >
    <text-input
      :value="attrs.email"
      type="email"
      :placeholder="$t('Email')"
      :error="'email' in errors"
      :disabled="saving || disabled"
      @input="updateAttrs({ key: 'email', value: $event })"
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
