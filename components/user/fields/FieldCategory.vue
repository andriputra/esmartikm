<template>
  <field
    :label="$t('Category')"
    :error="'sub_category_id' in errors"
    :feedback="errors.sub_category_id"
    inline
    required
  >
    <select-user-category
      :type="attrs.form_type"
      :value="attrs.sub_category_id"
      :error="'sub_category_id' in errors"
      :disabled="saving"
      @input="updateAttrs({ key: 'sub_category_id', value: $event })"
    />
  </field>
</template>

<script lang="ts">
import Vue from 'vue'
import mixin from './mixin'
import SelectUserCategory from '~/components/user/SelectUserCategory.vue'

export default Vue.extend({
  components: { SelectUserCategory },
  mixins: [mixin],
})
</script>
