<template>
  <field
    :label="$t('Shopee')"
    :error="'shopee' in errors"
    :feedback="errors.shopee"
    inline
  >
    <text-input
      :value="attrs.shopee"
      type="text"
      :placeholder="$t('Shopee URL')"
      :error="'shopee' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'shopee', value: $event })"
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
