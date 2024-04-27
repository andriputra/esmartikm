<template>
  <field
    :label="$t('Password Confirmation')"
    :error="'password_confirmation' in errors"
    :feedback="errors.password_confirmation"
    inline
    required
  >
    <text-input
      :value="attrs.password_confirmation"
      type="password"
      :placeholder="$t('Password Confirmation')"
      :error="'password_confirmation' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'password_confirmation', value: $event })"
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
