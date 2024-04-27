<template>
  <div>
    <field-category />
    <field-product-image />
    <hr class="my-5" />
    <field-have-trademark />
    <hr class="my-5" />
    <field-product-consumer />
    <hr class="my-5" />
    <field-marketing-area />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldCategory from '~/components/user/fields/FieldCategory.vue'
import FieldProductImage from '~/components/user/fields/FieldProductImage.vue'
import FieldHaveTrademark from '~/components/user/fields/FieldHaveTrademark.vue'
import FieldProductConsumer from '~/components/user/fields/FieldProductConsumer.vue'
import FieldMarketingArea from '~/components/user/fields/FieldMarketingArea.vue'

export default Vue.extend({
  components: {
    FieldCategory,
    FieldProductImage,
    FieldHaveTrademark,
    FieldProductConsumer,
    FieldMarketingArea,
  },
})
</script>
