<template>
  <field
    :label="$t('Password')"
    :error="'password' in errors"
    :feedback="errors.password"
    inline
    required
  >
    <text-input
      :value="attrs.password"
      type="password"
      :placeholder="$t('Password')"
      :error="'password' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'password', value: $event })"
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
