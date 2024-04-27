<template>
  <div class="container">
    <header class="header">
      <nuxt-link to="/user" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>Ubah Data</h2>
    </header>
    <div class="content max-w-2xl">
      <form class="py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          <nuxt-link
            to="/user"
            class="content__link font-bold text-lg mb-2 -ml-4"
          >
            <span class="inline-flex items-center">
              <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{
                $t('Back')
              }}
            </span>
          </nuxt-link>
          <h2 class="text-3xl font-bold mb-5">
            {{ $t('Update Business Information') }}
          </h2>
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Basic Information') }}
          </h2>
          <form-business />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('License') }}
          </h2>
          <form-license />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Owner') }}
          </h2>
          <form-owner />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Links') }}
          </h2>
          <form-links />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Product Information') }}
          </h2>
          <form-product />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Product Certification') }}
          </h2>
          <form-product-certification />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Supporting Questions') }}
          </h2>
          <form-survey />
          <field inline>
            <btn :disabled="saving">
              {{ $t('Save') }}
            </btn>
          </field>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import FormBusiness from '~/components/user/FormBusiness.vue'
import FormLicense from '~/components/user/FormLicense.vue'
import FormOwner from '~/components/user/FormOwner.vue'
import FormLinks from '~/components/user/FormLinks.vue'
import FormProduct from '~/components/user/FormProduct.vue'
import FormProductCertification from '~/components/user/FormProductCertification.vue'
import FormSurvey from '~/components/user/FormSurvey.vue'

export default Vue.extend({
  components: {
    Btn,
    Field,
    FormBusiness,
    FormLicense,
    FormOwner,
    FormLinks,
    FormProduct,
    FormProductCertification,
    FormSurvey,
  },
  middleware({ $auth, redirect }) {
    // If the user is admin
    const user: any = $auth.user
    if (user.role_id !== 2) {
      return redirect('/user/account')
    }
  },
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('users/profile', {
      init: 'INIT',
      save: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.save()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$auth.fetchUser()

      this.$toast('success', {
        text: this.$t('Update requested!'),
      }).show()

      this.$router.push('/user')
    },
  },
})
</script>
