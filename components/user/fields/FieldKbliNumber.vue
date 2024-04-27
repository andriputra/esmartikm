<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="$t('KBLI Number')"
    :error="'kbli_number' in errors"
    :feedback="errors.kbli_number"
    inline
    required
  >
    <text-input
      :value="attrs.kbli_number"
      type="number"
      :placeholder="$t('KBLI Number')"
      :error="'kbli_number' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'kbli_number', value: $event })"
    />
  </field>

  <field
    v-else
    :label="$t('KBLI Number')"
    :error="'kbli_number' in errors"
    :feedback="errors.kbli_number"
    inline
  >
    <text-input
      :value="attrs.kbli_number"
      type="number"
      :placeholder="$t('KBLI Number')"
      :error="'kbli_number' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'kbli_number', value: $event })"
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
