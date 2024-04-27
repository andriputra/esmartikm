<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="
      $t(
        'Does It Have Product Certification? If yes, write down the type of certification, if not just leave it blank'
      )
    "
    :error="'product_certification' in errors"
    :feedback="errors.product_certification"
  >
    <text-input
      :value="attrs.product_certification"
      type="text"
      :placeholder="$t('Product Certification')"
      :error="'product_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'product_certification', value: $event })"
    />
  </field>

  <field
    v-else
    :label="
      $t(
        'Does It Have Product Certification? If yes, write down the type of certification, if not just leave it blank'
      )
    "
    :error="'product_certification' in errors"
    :feedback="errors.product_certification"
    required
  >
    <text-input
      :value="attrs.product_certification"
      type="text"
      :placeholder="$t('Product Certification')"
      :error="'product_certification' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'product_certification', value: $event })"
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
