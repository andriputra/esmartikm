<template>
  <div>
    <field-instagram />
    <field-facebook />
    <field-youtube />
    <field-tiktok />
    <field-linkedin />
    <field-whatsapp />
    <field-indotrading />
    <field-website />
    <field-tokopedia />
    <field-bukalapak />
    <field-bliblicom />
    <field-shopee />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FieldInstagram from '~/components/user/fields/FieldInstagram.vue'
import FieldFacebook from '~/components/user/fields/FieldFacebook.vue'
import FieldYoutube from '~/components/user/fields/FieldYoutube.vue'
import FieldTiktok from '~/components/user/fields/FieldTiktok.vue'
import FieldLinkedin from '~/components/user/fields/FieldLinkedin.vue'
import FieldWhatsapp from '~/components/user/fields/FieldWhatsapp.vue'
import FieldWebsite from '~/components/user/fields/FieldWebsite.vue'
import FieldTokopedia from '~/components/user/fields/FieldTokopedia.vue'
import FieldBukalapak from '~/components/user/fields/FieldBukalapak.vue'
import FieldBliblicom from '~/components/user/fields/FieldBliblicom.vue'
import FieldShopee from '~/components/user/fields/FieldShopee.vue'
import FieldIndotrading from '~/components/user/fields/FieldIndotrading.vue'

export default Vue.extend({
  components: {
    FieldInstagram,
    FieldFacebook,
    FieldYoutube,
    FieldTiktok,
    FieldLinkedin,
    FieldWhatsapp,
    FieldWebsite,
    FieldTokopedia,
    FieldBukalapak,
    FieldBliblicom,
    FieldShopee,
    FieldIndotrading,
  },
})
</script>
