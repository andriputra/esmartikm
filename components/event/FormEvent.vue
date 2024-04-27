<template>
  <div>
    <field-name />
    <field-description />
    <field-active />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldName from '~/components/event/fields/FieldName.vue'
import FieldDescription from '~/components/event/fields/FieldDescription.vue'
import FieldActive from '~/components/event/fields/FieldActive.vue'

export default Vue.extend({
  components: {
    FieldName,
    FieldDescription,
    FieldActive,
  },
})
</script>
