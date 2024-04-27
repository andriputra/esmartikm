<template>
  <field
    :label="
      $t(
        'Do you have TKDN Certification? If yes, write down the type of certification, if not just leave it blank'
      )
    "
    :error="'tkdn_certification' in errors"
    :feedback="errors.tkdn_certification"
  >
    <text-input
      :value="attrs.tkdn_certification"
      type="text"
      :placeholder="$t('TKDN Certification')"
      :error="'tkdn_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'tkdn_certification', value: $event })"
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
