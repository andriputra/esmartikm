<template>
  <div class="container max-w-2xl">
    <header class="header">
      <h2>{{ $t('Registration') }}</h2>
    </header>
    <div class="content">
      <form class="py-4 px-6" @submit.prevent="submitHandler">
        <div class="p-5">
          {{ $t('Already registered?') }}
          <nuxt-link to="/login" class="ml-5 text-lg font-bold content__link"
            >{{ $t('Login') }}!</nuxt-link
          >
          <hr class="my-5 flex items-center" />
          <h2 class="text-sm mb-5">{{ $t('Required') }}</h2>
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Account Information') }}
          </h2>
          <field-email />
          <field-username />
          <field-password />
          <field-password-confirmation />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Business Information') }}
          </h2>
          <form-business />
          <h2 class="text-xl font-bold mb-5">{{ $t('Business License') }}</h2>
          <form-license />
          <h2 class="text-xl font-bold mb-5">{{ $t('Business Owner') }}</h2>
          <form-owner />
          <h2 class="text-xl font-bold mb-5">{{ $t('Links') }}</h2>
          <form-links />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Product Information') }}
          </h2>
          <form-product />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Product Certification') }} ({{ $t('Optional') }})
          </h2>
          <form-product-certification />
          <h2 class="text-xl font-bold mb-5">
            {{ $t('Supporting Questions') }}
          </h2>
          <form-survey />
          <hr class="my-5" />
          <field
            inline
            class="my-5"
            :error="'tac' in errors"
            :feedback="errors.tac"
          >
            <checkbox
              :value="tac"
              :error="'tac' in errors"
              :disabled="saving"
              @change="agree"
            >
              {{ $t('I agree to the Terms of Service') }}
            </checkbox>
          </field>
          <field inline>
            <btn :disabled="saving">
              {{ $t('Register') }}
            </btn>
          </field>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import Btn from '~/components/Btn.vue'
import Field from '~/components/form/Field.vue'
import FieldEmail from '~/components/user/fields/FieldEmail.vue'
import FieldUsername from '~/components/user/fields/FieldUsername.vue'
import FieldPassword from '~/components/user/fields/FieldPassword.vue'
import FieldPasswordConfirmation from '~/components/user/fields/FieldPasswordConfirmation.vue'
import FormBusiness from '~/components/user/FormBusiness.vue'
import FormLicense from '~/components/user/FormLicense.vue'
import FormOwner from '~/components/user/FormOwner.vue'
import FormLinks from '~/components/user/FormLinks.vue'
import FormProduct from '~/components/user/FormProduct.vue'
import FormSurvey from '~/components/user/FormSurvey.vue'
import FormProductCertification from '~/components/user/FormProductCertification.vue'
import Checkbox from '~/components/form/Checkbox.vue'

export default Vue.extend({
  components: {
    FieldEmail,
    FieldUsername,
    FieldPassword,
    FieldPasswordConfirmation,
    FormBusiness,
    FormLicense,
    FormOwner,
    FormLinks,
    FormProduct,
    FormProductCertification,
    FormSurvey,
    Btn,
    Field,
    Checkbox,
  },
  auth: 'guest',
  layout: 'public',
  middleware({ store, redirect }) {
    if (!store.state.settings.model.attrs.registration.value) {
      return redirect('/')
    }
  },
  computed: {
    ...mapState('users/model', ['errors', 'saving']),
    ...mapState('users/register', ['tac']),
  },
  created() {
    this.setErrors([])
  },
  methods: {
    ...mapMutations('users/register', {
      agree: 'AGREE',
    }),
    ...mapMutations('users/model', {
      setErrors: 'SET_ERRORS',
    }),
    ...mapActions('users/register', {
      register: 'SUBMIT',
    }),
    async submitHandler(): Promise<any> {
      const { error, response } = await this.register()

      if (error) {
        return this.$toast('error', { text: response.data.message }).show()
      }

      this.$toast('success', {
        text: this.$t('Registration success!'),
      }).show()

      this.$router.push('/login')
    },
  },
})
</script>
