<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/users" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>Konfirmasi Perubahan Data</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6 relative">
        <loading v-if="loading" />
        <template v-else>
          <avatar
            :src="attrs.user.product_thumbnail_url"
            :name="attrs.user.name"
            class="w-32 text-4xl absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 -mt-2.5"
            frame-class="border-8 border-white"
          />
          <h2 class="text-3xl font-bold mb-5 text-center mt-12">
            {{ attrs.user.name }}
          </h2>
          <div class="flex flex-col space-y-3">
            <div class="card bg-yellow-50">
              <div class="card__body flex items-center space-x-5">
                <svg-icon name="notification" class="w-12 h-12 text-gray-500" />
                <div class="flex-1">
                  {{
                    $t('Change(s) below are waiting for your approval', {
                      n: changesCount,
                    })
                  }}
                </div>
                <loading v-if="verifying" />
                <span v-else class="space-x-3">
                  <btn
                    variant="icon"
                    class="green-600 opacity-50 hover:opacity-100"
                    @click="approveClickHandler"
                    ><svg-icon name="thumb_up_alt"
                  /></btn>
                  <btn
                    variant="icon"
                    class="red-600 opacity-50 hover:opacity-100"
                    @click="rejectClickHandler"
                    ><svg-icon name="thumb_down_alt"
                  /></btn>
                </span>
              </div>
            </div>
            <div v-if="rejecting" class="card">
              <form
                class="card__body flex items-start space-x-4"
                @submit.prevent="confirmReject"
              >
                <field-reason class="flex-1" />
                <btn :disabled="verifying">
                  {{ $t('Reject') }}
                </btn>
              </form>
            </div>
            <div
              v-for="(values, field) in attrs.sot"
              :key="field"
              class="card flex items-center justify-evenly relative bg-gradient-to-r from-gray-200 to-white"
            >
              <div class="py-4 pl-6 pr-10 opacity-50 flex-1">
                {{ values.original }}
              </div>
              <div
                class="leading-none text-center border rounded bg-white px-2 text-sm"
              >
                {{ field }}<br />
                <svg-icon
                  name="arrow_back"
                  class="text-gray-500 transform rotate-180 w-4 h-4"
                />
              </div>
              <div class="py-4 pr-6 pl-10 font-bold flex-1 text-right">
                {{ values.changes }}
              </div>
            </div>
            <div
              v-if="attrs.changes_ktp_thumbnail_url"
              class="card grid grid-cols-2 relative bg-gradient-to-r from-gray-200 to-white"
            >
              <div
                class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none text-center border rounded bg-white px-2 text-sm"
              >
                ktp<br />
                <svg-icon
                  name="arrow_back"
                  class="text-gray-500 transform rotate-180 w-4 h-4"
                />
              </div>
              <div class="py-4 pl-6 pr-10 bg-gray-100 opacity-50">
                <avatar
                  :src="
                    attrs.user.ktp_thumbnail_url
                      ? attrs.user.ktp_thumbnail_url
                      : ''
                  "
                  :origin="
                    attrs.user.ktp_image_url ? attrs.user.ktp_image_url : ''
                  "
                  :name="attrs.user.name"
                />
              </div>
              <div class="py-4 pr-6 pl-10 font-bold text-right">
                <avatar
                  :src="attrs.changes_ktp_thumbnail_url"
                  :origin="attrs.changes_ktp_image_url"
                  :name="attrs.user.name"
                />
              </div>
            </div>
            <div
              v-if="attrs.changes_product_thumbnail_url"
              class="card grid grid-cols-2 relative bg-gradient-to-r from-gray-200 to-white"
            >
              <div
                class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none text-center border rounded bg-white px-2 text-sm"
              >
                product<br />
                <svg-icon
                  name="arrow_back"
                  class="text-gray-500 transform rotate-180 w-4 h-4"
                />
              </div>
              <div class="py-4 pl-6 pr-10 bg-gray-100 opacity-50">
                <avatar
                  :src="
                    attrs.user.product_thumbnail_url
                      ? attrs.user.product_thumbnail_url
                      : ''
                  "
                  :origin="
                    attrs.user.product_image_url
                      ? attrs.user.product_image_url
                      : ''
                  "
                  :name="attrs.user.name"
                />
              </div>
              <div class="py-4 pr-6 pl-10 font-bold text-right">
                <avatar
                  :src="attrs.changes_product_thumbnail_url"
                  :origin="attrs.changes_product_image_url"
                  :name="attrs.user.name"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import dateFormat from 'date-fns/format'
import Avatar from '~/components/user/Avatar.vue'
import Btn from '~/components/Btn.vue'
import FieldReason from '~/components/approval/fields/FieldReason.vue'
import Loading from '~/components/Loading.vue'

export default Vue.extend({
  components: { Avatar, Btn, FieldReason, Loading },
  data() {
    return { dateFormat, rejecting: false }
  },
  computed: {
    ...mapState('approvals/model', ['attrs', 'loading', 'verifying']),
    changesCount(): number {
      let sot = this.attrs.sot
      if (!sot) sot = {}
      let cnt = Object.keys(sot).length
      if (this.attrs.changes_product_thumbnail_url) cnt++
      if (this.attrs.changes_ktp_thumbnail_url) cnt++
      return cnt
    },
  },
  methods: {
    ...mapActions('approvals/model', { approve: 'APPROVE', reject: 'REJECT' }),
    async approveClickHandler() {
      const confirmText: any = this.$t('Approve?')
      if (!window.confirm(confirmText)) {
        return
      }

      const { error } = await this.approve()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('Update approved!'),
        }).show()
        this.$router.push('/users/approvals')
      }
    },
    rejectClickHandler() {
      this.rejecting = true
    },
    async confirmReject() {
      const { error } = await this.reject()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('Update rejected!'),
        }).show()
        this.$router.push('/users/approvals')
      }
    },
  },
})
</script>
