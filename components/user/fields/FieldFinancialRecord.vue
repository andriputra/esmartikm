<template>
  <field
    :label="$t('Have you made financial records?')"
    :error="'financial_record' in errors"
    :feedback="errors.financial_record"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.financial_record"
        :error="'financial_record' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'financial_record', value: $event })"
      >
        {{ option }}
      </radiobox>
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import Radiobox from '~/components/form/Radiobox.vue'

export default Vue.extend({
  components: { Radiobox },
  mixins: [mixin],
  data() {
    return {
      options: [
        'Belum melakukan catatan keuangan',
        'Sudah, dicatat manual',
        'Sudah, dicatat di excel',
        'Sudah, memakai software/aplikasi pencatatan keuangan',
      ],
    }
  },
})
</script>
