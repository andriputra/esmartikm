<template>
  <field
    :label="$t('The main obstacle faced in running a business')"
    :error="'bussines_problem' in errors"
    :feedback="errors.bussines_problem"
    field-class="ml-40 pl-3 my-3"
    required
  >
    <div class="space-y-2">
      <radiobox
        v-for="option in options"
        :key="option"
        :value="option"
        :model-value="attrs.bussines_problem"
        :error="'bussines_problem' in errors"
        :disabled="saving"
        @change="updateAttrs({ key: 'bussines_problem', value: $event })"
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
        'Permodalan',
        'Bahan Baku',
        'Pemasaran',
        'Produksi',
        'SDM',
        'Teknologi',
        'Desain',
      ],
    }
  },
})
</script>
