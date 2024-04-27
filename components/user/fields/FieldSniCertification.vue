<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="
      $t(
        'Do you have SNI Certification? (Specifically for baby / child clothing and children`s toys manufacturers) If yes, write down the number, if not just leave it blank'
      )
    "
    :error="'sni_certification' in errors"
    :feedback="errors.sni_certification"
  >
    <text-input
      :value="attrs.sni_certification"
      type="text"
      :placeholder="$t('SNI Certification')"
      :error="'sni_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'sni_certification', value: $event })"
    />
  </field>

  <field
    v-else
    :label="
      $t(
        'Do you have SNI Certification? (Specifically for baby / child clothing and children`s toys manufacturers) If yes, write down the number, if not just leave it blank'
      )
    "
    :error="'sni_certification' in errors"
    :feedback="errors.sni_certification"
    required
  >
    <text-input
      :value="attrs.sni_certification"
      type="text"
      :placeholder="$t('SNI Certification')"
      :error="'sni_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'sni_certification', value: $event })"
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
