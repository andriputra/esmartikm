<template>
  <field
    :label="
      $t(
        'What type of Technical Guidance / Training in the area interests you?'
      )
    "
    :error="'interested_ikma_trainings' in errors"
    :feedback="errors.interested_ikma_trainings"
    required
  >
    <div class="space-y-2">
      <rich-select
        :value="attrs.interested_ikma_trainings"
        multiple
        :close-on-select="false"
        :show-labels="false"
        :options="options"
        :placeholder="$t('Select one or more trainings')"
        @input="
          updateAttrs({ key: 'interested_ikma_trainings', value: $event })
        "
      />
    </div>
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import RichSelect from '~/components/form/RichSelect.vue'

export default Vue.extend({
  components: { RichSelect },
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
        'GMP',
        'Kemasan',
      ],
    }
  },
})
</script>
