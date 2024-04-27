<template>
  <field
    :label="
      $t(
        'Write down Halal Certificate Number: if you don`t have it, just leave it blank'
      )
    "
    :error="'halal_certification' in errors"
    :feedback="errors.halal_certification"
  >
    <text-input
      :value="attrs.halal_certification"
      type="text"
      :placeholder="$t('Halal Certification')"
      :error="'halal_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'halal_certification', value: $event })"
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
