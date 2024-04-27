<template>
  <field
    v-if="attrs.form_type === 'Industri Pangan, Furnitur dan Bahan Bangunan'"
    :label="$t('Education')"
    :error="'education' in errors"
    :feedback="errors.education"
    inline
  >
    <select-education
      :value="attrs.education"
      :error="'education' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'education', value: $event })"
    />
  </field>

  <field
    v-else
    :label="$t('Education')"
    :error="'education' in errors"
    :feedback="errors.education"
    inline
    required
  >
    <select-education
      :value="attrs.education"
      :error="'education' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'education', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectEducation from '~/components/user/SelectEducation.vue'

export default Vue.extend({
  components: { SelectEducation },
  mixins: [mixin],
})
</script>
